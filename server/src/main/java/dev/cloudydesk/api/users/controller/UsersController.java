package dev.cloudydesk.api.users.controller;

import dev.cloudydesk.api.users.repository.UsersRepository;
import dev.cloudydesk.api.users.model.Users;
import dev.cloudydesk.api.users.responses.UsersResponse;
import dev.cloudydesk.api.users.service.UsersService;
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

/**
 * @author meugenom
 * @since 2023-05-02
 */

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
    public List<Users> getUsersList() {
		return usersService.GetAllUsers();
    }

    //@PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    //@PostMapping("")
    //public Users GetUsers(@RequestBody UsersRequest user) {
    //    return usersService.AddUser(user);
    //}
	
	@GetMapping("/user")
	public ResponseEntity<Map<String, Object>> whoami() {
	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		Map<String, Object> responseMap = new HashMap<>();

		//prepare authResponse
		UsersResponse userResponse = new UsersResponse("", "", authentication.getName(), "", false);

		//check info and add additional fileds
		Optional<Users>  userOptional = usersRepository.findByEmail(authentication.getName());

		if (userOptional.isPresent() && authentication != null) {
			Users result = userOptional.get();
			userResponse.setId(result.getId());
			userResponse.setFirstName(result.getFirstName());
			userResponse.setLastName(result.getLastName());
			userResponse.setRoles(result.getRoles());
			userResponse.setIsActive(result.getIsActive());

			logger.info(userResponse.toString());

			responseMap.put("error", false);
			responseMap.put("message", "User name was checked. User info returned");
			responseMap.put("user", userResponse);

			return ResponseEntity.ok(responseMap);

		} else {
			responseMap.put("error", true);
			responseMap.put("message", "Invalid user name");
			return ResponseEntity.status(500).body(responseMap);
		}
	}
}
