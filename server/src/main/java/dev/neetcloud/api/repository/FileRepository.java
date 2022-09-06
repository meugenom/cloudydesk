package dev.neetcloud.api.repository;

import dev.neetcloud.api.model.File;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FileRepository extends MongoRepository<File, String> {

	@Query(value = "{name:'?0'}")
	List<File> findFileByName(String name);

	@Query(value = "{id:'?0'}")
	File findFileById(String id);

	@Query(value = "{createdUser :'?0'}")
	List<File> findByCreatedUser(String createdUser);

	@Query(value = "{createdUser :'?0', path: '?0'}")
	List<File> findByCreatedUserPath(String createdUser, String path);
}