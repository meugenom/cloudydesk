package dev.neetcloud.api.controller;

import dev.neetcloud.api.model.File;
import dev.neetcloud.api.repository.FileRepository;
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

	@PostMapping("/uploadFile")
	public File uploadFile(@RequestParam("file") MultipartFile file) {

		String fileName = fileStorageService.storeFile(file);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/downloadFile")
				.path(fileName)
				.toUriString();

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		File fi = new File();
		fi.setName(fileName);
		fi.setType(file.getContentType());
		fi.setPath("/desktop");
		fi.setSize(file.getSize());
		fi.setCreatedUser(authentication.getName());
		fi.setCreatedDate(new Date().toString());
		fileRepository.save(fi);

		File res = new File();
		res.setName(fileName);
		res.setPath(fileDownloadUri);
		res.setType(file.getContentType());
		res.setSize(file.getSize());

		return res;
	}

	@GetMapping("/ls")
	public ResponseEntity<Map<String, Object>> getDir() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> responseMap = new HashMap<>();

		logger.info("name: " + authentication.getName());

		if (authentication.getName() != null) {

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

	@GetMapping("/downloadFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,
			HttpServletRequest request) {
		
		logger.info("fileName: "+ fileName);

		// Load file as Resource
		Resource resource = fileStorageService.loadFileAsResource(fileName);

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
}
