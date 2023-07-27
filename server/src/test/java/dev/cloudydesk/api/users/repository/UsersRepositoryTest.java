package dev.cloudydesk.api.users.repository;

import dev.cloudydesk.api.UserSecurity.dao.JpaUserDetailsService;
import dev.cloudydesk.api.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


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