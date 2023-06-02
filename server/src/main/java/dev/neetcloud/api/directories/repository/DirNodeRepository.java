package dev.neetcloud.api.directories.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.neetcloud.api.directories.model.DirNode;


public interface DirNodeRepository extends JpaRepository<DirNode, Long> {
	
	//methods

}