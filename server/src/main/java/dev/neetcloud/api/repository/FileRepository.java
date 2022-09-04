package dev.neetcloud.api.repository;

import dev.neetcloud.api.model.File;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FileRepository extends MongoRepository<File, String> {
	@Query(value = "{name:'?0'}")
	File findFileByName(String name);
}