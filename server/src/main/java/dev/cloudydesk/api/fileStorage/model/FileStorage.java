package dev.cloudydesk.api.fileStorage.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

//import jakarta.persistence.*;
//import lombok.*;

@Component
@ConfigurationProperties(prefix = "file")
public class FileStorage {

	private String uploadDir;
	
	public String getUploadDir() {
		return uploadDir;
	}

	public void setUploadDir(String uploadDir) {
		this.uploadDir = uploadDir;
	}
}