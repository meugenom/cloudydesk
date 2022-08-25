package dev.neetcloud.api.repository;

import dev.neetcloud.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
	@Query(value = "{userName:'?0'}")
	User findUserByUsername(String username);
}