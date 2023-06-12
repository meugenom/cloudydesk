package dev.neetcloud.api.file.controller;

import dev.neetcloud.api.dir.model.Dir;
import dev.neetcloud.api.dir.model.GraphNode;
import dev.neetcloud.api.dir.service.DirService;
import dev.neetcloud.api.file.model.Files;
import dev.neetcloud.api.fileStorage.service.FileStorageService;
import dev.neetcloud.api.file.repository.FilesRepository;
import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.repository.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;


/**
 * @description: FilesController is used to handle all the requests related to files
 * @author meugenom
 * @date 06-12-2023
 */

@RestController
@RequestMapping("api/v1/files")
public class FilesController {

	private static final Logger logger = LoggerFactory.getLogger(FilesController.class);

	@Autowired
	private FileStorageService fileStorageService;
	@Autowired
	private FilesRepository filesRepository;
	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private DirService dirService;

	/**
	 * @description: uploading file to the server
	 * @param file in multipart format
	 * @param dirId directory id
	 * @return ResponseEntity<Map < String, Object>>
	 */
	@PostMapping("/uploadFile")
	public ResponseEntity<Map<String, Object>> uploadFile(
			@RequestParam("") MultipartFile file,
			@RequestParam("dirId") String dirId) {
		Map<String, Object> responseMap = new HashMap<>();

		// get user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());
		// logger.info(" current user id: " + currentUser.getId());

		// check file name
		String fileName = fileStorageService.checkFileName(file);

		long currentDirId = Long.parseLong(dirId);

		if (fileName != null && currentUser != null) {

			// save file data in the repo
			Files currentFile = new Files(
					fileName,
					file.getContentType(),
					currentDirId,
					file.getSize(),
					currentUser.getId(),
					currentUser.getId());

			// save in database
			filesRepository.save(currentFile);

			// get index for file
			String currentFileId = currentFile.getId();

			// save file to disk
			fileName = fileStorageService.storeFile(file, Long.toString(currentUser.getId()), currentFileId);

			responseMap.put("fileName", fileName);
			responseMap.put("type", file.getContentType());
			responseMap.put("size", file.getSize());

			return ResponseEntity.ok(responseMap);

		}

		responseMap.put("error", true);
		responseMap.put("message", "Invalid operation");
		return ResponseEntity.status(500).body(responseMap);
	}

	/**
	 * @description: downloading file and directory list from the server by user id from the jwt token
	 * @return files and dirs list
	 */

	@GetMapping("/ls")
	public ResponseEntity<Map<String, Object>> getDir() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> responseMap = new HashMap<>();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		if (currentUser != null && authentication != null) {

			// get files from repo
			Iterable<Files> files = filesRepository.findAllByCreatedUserId(currentUser.getId());
			// logger.info(files.toString());
			GraphNode<Dir> dirTree = (GraphNode<Dir>) dirService.getDirTree(currentUser.getId());
			logger.info(dirTree.toString());

			responseMap.put("error", false);
			responseMap.put("email", authentication.getName().toString());
			responseMap.put("message", "Files were found");
			responseMap.put("files", files);
			responseMap.put("dirs", dirTree);

			return ResponseEntity.ok(responseMap);

		} else {
			responseMap.put("error", true);
			responseMap.put("message", "Invalid name");
			return ResponseEntity.status(401).body(responseMap);
		}
	}

	/**
	 * @description: downloading file info from the server by file id
	 * @param fileId
	 * @return file info
	 */
	@GetMapping("/file")
	public ResponseEntity<Files> getFile(
			@RequestParam("id") String fileId) {
		// get current user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		logger.info("got auth info");

		if (currentUser != null) {

			logger.info("got currentUser");

			// find file in the repository
			Files file = filesRepository.getOne(fileId);

			return ResponseEntity.ok(file);

		} else {
			return ResponseEntity.status(401).body(null);
		}
	}


	/**
	 * @description: creating new file with name NewFile
	 * @param body(file object) , jwt token
	 * @return file info created by default
	 */
	@PostMapping("/file")
	public ResponseEntity<Files> createFile(
			@RequestBody Map<String, String> body) {

		// get current user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		if (currentUser != null) {

			Long dirId = Long.parseLong(body.get("dirId"));
			Long createUserId = Long.parseLong(body.get("createdUserId"));
			Long modifiedUserId = Long.parseLong(body.get("modifiedUserId"));

			// create new file by default
			Files newFile = new Files(
					body.get("name"),
					body.get("type"),
					dirId,
					0L,
					createUserId,
					modifiedUserId);
			try {
				filesRepository.save(newFile);
				String currentFileId = newFile.getId();

				// store new empty file to disk
				try {

					fileStorageService.storeNewFile(Long.toString(currentUser.getId()), currentFileId);

				} catch (Exception e) {
					e.printStackTrace();
					return ResponseEntity.status(502).body(null);

				};

				return ResponseEntity.ok(newFile);

			} catch (EntityNotFoundException ex) {

				return ResponseEntity.status(502).body(null);

			}

		} else {
			return ResponseEntity.status(401).body(null);
		}
	}

	/**
	 * @description: editing file info by File() object from the body of request
	 * @param body(file object), jwt token
	 * @return file info
	 */
	@PutMapping("/file")
	public ResponseEntity<Map<String, Object>> editFile(
			@RequestBody Map<String, String> body) {

		//create response map
		Map<String, Object> responseMap = new HashMap<>();

		// get current user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		if (currentUser != null) {

			//casting string data to Long
			Long dirId = Long.parseLong(body.get("dirId"));
			Long createUserId = Long.parseLong(body.get("createdUserId"));
			Long modifiedUserId = Long.parseLong(body.get("modifiedUserId"));

			try{
				//get from database our existed file
				Files file = filesRepository.getOne(body.get("id"));
				//if changed name, directory
				file.setName(body.get("name"));
				file.setDirId(dirId);

				//info about editing
				file.setModifiedUserId(currentUser.getId());
				file.setModifiedDate(LocalDate.now());

				//file save in the database
				filesRepository.save(file);

				responseMap.put("error","false");
				responseMap.put("message","File was edited");
				return ResponseEntity.ok().body(responseMap);

			}catch(EntityNotFoundException ex){

				responseMap.put("error","true");
				responseMap.put("errorName","file doesn't exist");
				return ResponseEntity.status(502).body(responseMap);
			}
		}

		responseMap.put("error","true");
		responseMap.put("errorName","User doesn't exist");
		return ResponseEntity.status(403).body(responseMap);
	}

	/**
	 * @description: deleting file from the database and from the storage
	 * @param body(file object), jwt token
	 * @return response map with info about deleting (ok or error
	 */
	@DeleteMapping("/file")
	public ResponseEntity<Map<String, Object>> deleteFile(
			@RequestBody Map<String, String> body
	){
		//create response map
		Map<String, Object> responseMap = new HashMap<>();

		// get current user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		Long createUserId = Long.parseLong(body.get("createdUserId"));
		Long modifiedUserId = Long.parseLong(body.get("modifiedUserId"));

		//if user exists
		if (currentUser != null ) {

			try{
				//get file from repo
				Files file = filesRepository.getOne(body.get("id"));

				//delete file from database
				filesRepository.delete(file);

				//delete file on the storage
				fileStorageService.deleteFile(
						file.getId().toString(),
						file.getCreatedUserId().toString()
				);

				responseMap.put("error", "false");
				return ResponseEntity.ok().body(responseMap);

			}catch(EntityNotFoundException ex){

				responseMap.put("error", "true");
				responseMap.put("message","File is not exist");
				return ResponseEntity.status(502).body(null);
			}
		}

		responseMap.put("error", "true");
		responseMap.put("message", "User is not exist");
		return ResponseEntity.status(401).body(null);
	}

	/*
	 * @PostMapping("/api/uploadMultipleFiles")
	 * public List<File> uploadMultipleFiles(@RequestParam("files") MultipartFile[]
	 * files) {
	 * return Arrays.asList(files)
	 * .stream()
	 * .map(file -> uploadFile(file))
	 * .collect(Collectors.toList());
	 * }
	 */
	/**
	 * @description: downloading file from the storage
	 * @param fileId as @PathVariable, jwt token
	 * @return file as Resource
	 */

	@GetMapping("/downloadFile/{fileId:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileId,
			HttpServletRequest request) {

		logger.info("Need to load file with id: " + fileId);

		// check auth name
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());
		logger.info(" current user id: " + currentUser.getId());
		logger.info(" current first name: " + currentUser.getFirstName());
		logger.info(" auth name : " + authentication.getName());

		// if userName exists
		if (currentUser != null) {

			// Load file as Resource
			Resource resource = fileStorageService.loadFileAsResource(fileId, Long.toString(currentUser.getId()));

			// Try to determine file's content type
			String contentType = null;
			try {
				contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
			} catch (IOException ex) {
				logger.info("Could not determine file type.");
			}

			// Fallback to the default content type if type could not be determined
			if (contentType == null) {
				contentType = "application/octet-stream";
			}

			return ResponseEntity.ok()
					.contentType(MediaType.parseMediaType(contentType))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +
							resource.getFilename() + "\"")
					.body(resource);
		}
		// if error
		Resource resource = null;
		return ResponseEntity.status(500)
				.body(resource);
	}
}
