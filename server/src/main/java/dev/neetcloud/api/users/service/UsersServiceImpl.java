package dev.neetcloud.api.users.service;

import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.repository.UsersRepository;
import dev.neetcloud.api.users.requests.UsersRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UsersServiceImpl implements UsersService {
    private final UsersRepository usersRepository;

    public List<Users> GetAllUsers() {
        return usersRepository.findAll();
    }

    public Users AddUser(UsersRequest user) {
        Users newUser = new Users(
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				new BCryptPasswordEncoder().encode(user.getPassword()),
				user.getRoles(),
				true
		);
        
		//newUser.setFirstName(user.getFirstName());
        //newUser.setLastName(user.getLastName());
        //newUser.setEmail(user.getEmail());
        //newUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        //newUser.setRoles(user.getRoles());
        
		return usersRepository.save(newUser);
    }
}
