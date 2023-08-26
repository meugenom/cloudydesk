package dev.cloudydesk.api.UserSecurity.dao;

import dev.cloudydesk.api.UserSecurity.model.UserSecurity;
import dev.cloudydesk.api.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class JpaUserDetailsService implements UserDetailsService {
    private final UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		//System.out.println("JpaUserDetailsService: loadUserByUsername: email: " + email);
		//System.out.println("JpaUserDetailsService: loadUserByUsername: usersRepository.findByEmail(email): " + usersRepository.findByEmail(email));
        return usersRepository.findByEmail(email).map(UserSecurity::new).orElseThrow(() -> new UsernameNotFoundException("User Not Found!"));
    }
}
