package dev.neetcloud.api.service;

import dev.neetcloud.api.exception.FileStorageException;
import dev.neetcloud.api.exception.FileNotFoundException;
import dev.neetcloud.api.model.FileStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

	private final Path fileStorageLocation;

	@Autowired
	public FileStorageService(FileStorage fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
				.toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
					ex);
		}
	}

	public String checkFileName(MultipartFile file) {

		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		if (fileName.contains("..")) {
			return null;
		}

		return fileName;
	}

	public String storeFile(MultipartFile file, String userId, String fileId) {

		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// check current user dir
			Path testPath = Paths.get(System.getProperty("user.home"), "uploads", userId);
			Boolean isUserDirExists = Files.exists(testPath);
			// System.out.println("testPath = " + testPath);
			// System.out.println("isUserDirExists = " + isUserDirExists);
			// create dir for current user
			if (isUserDirExists == false) {
				Files.createDirectories(testPath);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = Paths.get(System.getProperty("user.home"), "uploads", userId, fileId);
			// System.out.println("targetLocation = " + targetLocation);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;

		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileId + ". Please try again!", ex);
		}
	}

	public Resource loadFileAsResource(String fileId, String userId) {

		try {
			// Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Path filePath = Paths.get(System.getProperty("user.home"), "uploads", userId, fileId);
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new FileNotFoundException("File not found " + fileId);
			}
		} catch (MalformedURLException ex) {
			throw new FileNotFoundException("File not found " + fileId, ex);
		}

	}
}