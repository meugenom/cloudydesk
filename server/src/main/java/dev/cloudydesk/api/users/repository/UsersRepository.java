package dev.cloudydesk.api.users.repository;

import dev.cloudydesk.api.users.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * @Author: meugenom
 * @since 2023-05-02
 */

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    
	Optional<Users> findByEmail(String email);

	Users getIdByEmail(String name);

}
