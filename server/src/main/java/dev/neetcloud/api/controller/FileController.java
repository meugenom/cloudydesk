package dev.neetcloud.api.controller;

import dev.neetcloud.api.model.File;
import dev.neetcloud.api.model.User;
import dev.neetcloud.api.repository.FileRepository;
import dev.neetcloud.api.repository.UserRepository;
import dev.neetcloud.api.service.FileStorageService;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@RestController
@RequestMapping("api/")
public class FileController {

	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileStorageService fileStorageService;
	@Autowired
	private FileRepository fileRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/uploadFile")
	public  ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("file") MultipartFile file) {
		Map<String, Object> responseMap = new HashMap<>();

		// get user name
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User currentUser = userRepository.getIdByUsername(authentication.getName());
		// logger.info(" current user id: " + currentUser.getId());

		// check file name
		String fileName = fileStorageService.checkFileName(file);

		if (fileName != null && currentUser != null) {
			// save file data in the mongo repo
			File currentFile = new File();
			currentFile.setName(fileName);
			currentFile.setType(file.getContentType());
			currentFile.setPath("/desktop");
			currentFile.setSize(file.getSize());
			currentFile.setCreatedUser(authentication.getName());
			currentFile.setCreatedDate(new Date().toString());
			
			//save in mongo db
			fileRepository.save(currentFile);

			// get index for file
			String currentFileId = currentFile.getId();

			// save file to disk
			fileName = fileStorageService.storeFile(file, currentUser.getId(), currentFileId);

			responseMap.put("fileName", fileName);
			responseMap.put("type", file.getContentType());
			responseMap.put("size", file.getSize());
			
			return ResponseEntity.ok(responseMap);

		}

		responseMap.put("error", true);
		responseMap.put("message", "Invalid operation");
		return ResponseEntity.status(500).body(responseMap);
	}

	@GetMapping("/ls")
	public ResponseEntity<Map<String, Object>> getDir() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> responseMap = new HashMap<>();

		User currentUser = userRepository.getIdByUsername(authentication.getName());


		if (currentUser != null) {

			List<File> files = fileRepository.findByCreatedUser(authentication.getName());

			// logger.info(files.toString());

			responseMap.put("error", false);
			responseMap.put("userName", authentication.getName().toString());
			responseMap.put("message", "User name was checked");
			responseMap.put("files", files);

			return ResponseEntity.ok(responseMap);

		} else {
			responseMap.put("error", true);
			responseMap.put("message", "Invalid name");
			return ResponseEntity.status(500).body(responseMap);
		}
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

	@GetMapping("/downloadFile/{fileId:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileId,
			HttpServletRequest request) {

		logger.info("Need to load file with id: " + fileId);

		// check auth name
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User currentUser = userRepository.getIdByUsername(authentication.getName());
		logger.info(" current user id: " + currentUser.getId());
		logger.info(" current user name: " + currentUser.getUserName());
		logger.info(" auth name : " + authentication.getName());

		// if userName exists
		if (currentUser != null) {

			// Load file as Resource
			Resource resource = fileStorageService.loadFileAsResource(fileId, currentUser.getId());

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
