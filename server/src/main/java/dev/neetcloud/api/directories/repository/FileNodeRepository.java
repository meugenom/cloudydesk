package dev.neetcloud.api.directories.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.neetcloud.api.directories.model.FileNode;


public interface FileNodeRepository extends JpaRepository<FileNode, Long> {
    
	// Add any additional methods if needed
}