package dev.cloudydesk.api.dir.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.cloudydesk.api.dir.model.Dir;


@Repository
public interface DirRepository extends JpaRepository<Dir, Long> {

    // find dir by dirId    
	Dir getOne(Long id);

    // find all dirs by created user id and name
    List<Dir> findByCreatedUserIdAndDirName(Long createdUserId, String name);

    // find all dirs by created user
    List<Dir> findByCreatedUserId(Long createdUserId);

}