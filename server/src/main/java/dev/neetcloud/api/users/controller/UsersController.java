package dev.neetcloud.api.users.controller;

import dev.neetcloud.api.auth.response.AuthenticationResponse;
import dev.neetcloud.api.auth.utils.UtilsCookie;
import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.repository.UsersRepository;
import dev.neetcloud.api.users.responses.UsersResponse;
import dev.neetcloud.api.users.service.UsersService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
	//public ResponseEntity<Map<String, Object>> whoami() {
		public ResponseEntity<String> whoami(HttpServletResponse response ) throws JsonProcessingException {
	
		//need to know when JWT token is expired
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();		

		if (authentication == null) {
			//delete old JWT token from response
			response.addCookie(UtilsCookie.getCookie(null));
			return ResponseEntity.status(500).body("JWT token is expired");
		}

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

			ObjectMapper objectMapper = new ObjectMapper();
			String json = objectMapper.writeValueAsString(userResponse);
			return ResponseEntity.ok().body(json);

		} else {
			return ResponseEntity.status(500).body("Invalid user name");
		}
	}
}
