package dev.neetcloud.api.users.controller;

import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.repository.UsersRepository;
import dev.neetcloud.api.users.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UsersController {

	private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    private final UsersService usersService;
	
	@Autowired
	private UsersRepository usersRepository;

    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @GetMapping("list")
    public List<Users> GetUsers() {
        return usersService.GetAllUsers();
    }

    //@PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    //@PostMapping("")
    //public Users GetUsers(@RequestBody UsersRequest user) {
    //    return usersService.AddUser(user);
    //}
	
	@GetMapping("/whoami")
	public ResponseEntity<Map<String, Object>> getDir() {
	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> responseMap = new HashMap<>();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		if (currentUser != null && authentication != null) {

			Optional<Users> user = usersRepository.findByEmail(currentUser.getEmail());

			logger.info(user.toString());

			responseMap.put("error", false);
			responseMap.put("email", authentication.getName().toString());
			responseMap.put("message", "User email was checked");
			responseMap.put("user", user);

			return ResponseEntity.ok(responseMap);

		} else {
			responseMap.put("error", true);
			responseMap.put("message", "Invalid name");
			return ResponseEntity.status(500).body(responseMap);
		}
	}
}
