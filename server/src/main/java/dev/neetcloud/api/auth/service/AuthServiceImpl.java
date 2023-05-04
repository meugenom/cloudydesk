package dev.neetcloud.api.auth.service;

import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.repository.UsersRepository;
import dev.neetcloud.api.users.requests.UsersRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private final UsersRepository usersRepository;

    public Optional<Users> AddUser(UsersRequest user) {
        Users newUser = new Users(
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				new BCryptPasswordEncoder().encode(user.getPassword()),
				"ROLE_USER",
				true
		);
		
        return Optional.of(usersRepository.save(newUser));
    }
}
