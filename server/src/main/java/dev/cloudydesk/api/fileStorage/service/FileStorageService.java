package dev.cloudydesk.api.fileStorage.service;

import dev.cloudydesk.api.fileStorage.exception.FileStorageException;
import dev.cloudydesk.api.fileStorage.model.FileStorage;
import dev.cloudydesk.api.file.exception.FileNotFoundException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

	private final Path fileStorageLocation;

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

	// create null file
	public boolean storeNewFile(String userId, String fileId) throws java.io.FileNotFoundException {

		try {

			Path testPath = Paths.get(System.getProperty("user.home"), "uploads", userId);
			Boolean isUserDirExists = Files.exists(testPath);

			System.out.println("testPath = " + testPath);
			System.out.println("isUserDirExists = " + isUserDirExists);

			// create dir for current user
			if (isUserDirExists == false) {
				Files.createDirectories(testPath);
			}

			// Copy file to the target location (Replacing existing file with the same name)
			Path targetLocation = Paths.get(System.getProperty("user.home"), "uploads", userId, fileId);

			System.out.println("targetLocation = " + targetLocation);

			File file = new File(targetLocation.toUri());
			boolean isCreated = file.createNewFile();
			try {

				return isCreated;

			}catch(Exception e){
				throw new FileStorageException("Could not store file " + fileId + ". Please try again!", e);
			}

		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileId + ". Please try again!", ex);
		}
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

	public String deleteFile(String fileId, String userId){

		try{
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
			Path targetLocation = Paths.get(System.getProperty("user.home"), "uploads",
					userId,
					fileId
			);

			System.out.println("targetLocation = " + targetLocation);

			File currentFile = new File(targetLocation.toUri());
			currentFile.delete();

			return "";
		}catch (IOException ex){
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