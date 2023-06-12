package dev.neetcloud.api.file.repository;

import dev.neetcloud.api.file.model.Files;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilesRepository extends JpaRepository<Files, String> {
	
	//find file by name
	Optional<Files> findByName(String name);

	//find file by id
	Files getOne(String id);
	
	//find by createdUserId is used in the project
	Iterable<Files> findAllByCreatedUserId(Long createdUserId);

	//find by path is used in the project
	Optional<Files> findByDirId(Long dirId);
	
}