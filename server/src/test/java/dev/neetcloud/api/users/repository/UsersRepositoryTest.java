package dev.neetcloud.api.users.repository;

import dev.neetcloud.api.UserSecurity.dao.JpaUserDetailsService;
import dev.neetcloud.api.auth.service.AuthService;
import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.requests.UsersRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;


/**
 * @Author: meugenom
 * @since 2023-05-18
 */
@DataJpaTest
public class UsersRepositoryTest {
    @Autowired
    AuthService authService;
    @Autowired
    JpaUserDetailsService jpaUserDetailsService;

    @Autowired
    private UsersRepository usersRepository;

//
//    @Test
//    @DisplayName("Find user by email")
//    public void testFindByEmail() {
//
//        Optional<Users> user = usersRepository.findByEmail("emma@web.de");
//        System.out.println(user.toString());
//    }
}