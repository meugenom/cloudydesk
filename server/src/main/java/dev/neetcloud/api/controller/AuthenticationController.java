package dev.neetcloud.api.controller;

import dev.neetcloud.api.model.User;
import dev.neetcloud.api.repository.UserRepository;
import dev.neetcloud.api.service.JwtUserDetailsService;
import dev.neetcloud.api.util.JwtTokenUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

	protected final Log logger = LogFactory.getLog(getClass());

	final UserRepository userRepository;
	final AuthenticationManager authenticationManager;
	final JwtUserDetailsService userDetailsService;
	final JwtTokenUtil jwtTokenUtil;

	public AuthenticationController(UserRepository userRepository, AuthenticationManager authenticationManager,
			JwtUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil) {
		this.userRepository = userRepository;
		this.authenticationManager = authenticationManager;
		this.userDetailsService = userDetailsService;
		this.jwtTokenUtil = jwtTokenUtil;
	}

	@PostMapping(value = "/login")
	public ResponseEntity<Map<String, Object>> loginUser(
			@RequestBody User user) {
		Map<String, Object> responseMap = new HashMap<>();
		try {

			// logger.info("password: " + user.getPassword());
			// logger.info("userName: " + user.getUserName());

			Authentication auth = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));
			if (auth.isAuthenticated()) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUserName());
				String token = jwtTokenUtil.generateToken(userDetails);
				responseMap.put("error", false);
				responseMap.put("userName", userDetails.getUsername());
				responseMap.put("message", "Logged In");
				responseMap.put("token", token);
				return ResponseEntity.ok(responseMap);
			} else {
				responseMap.put("error", true);
				responseMap.put("message", "Invalid Credentials");
				return ResponseEntity.status(401).body(responseMap);
			}
		} catch (DisabledException e) {
			e.printStackTrace();
			responseMap.put("error", true);
			responseMap.put("message", "User is disabled");
			return ResponseEntity.status(500).body(responseMap);
		} catch (BadCredentialsException e) {
			responseMap.put("error", true);
			responseMap.put("message", "Invalid Credentials");
			return ResponseEntity.status(401).body(responseMap);
		} catch (Exception e) {
			e.printStackTrace();
			responseMap.put("error", true);
			responseMap.put("message", "Something went wrong");
			return ResponseEntity.status(500).body(responseMap);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> saveUser(
			@RequestBody User user) {

		Map<String, Object> responseMap = new HashMap<>();

		user.setUserName(user.getUserName());
		user.setEmail(user.getEmail());
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		user.setRole("USER");

		UserDetails userDetails = userDetailsService.createUserDetails(user.getUserName(), user.getPassword(),
				user.getEmail());
		String token = jwtTokenUtil.generateToken(userDetails);
		userRepository.save(user);
		responseMap.put("error", false);
		responseMap.put("userName", user.getUserName());
		responseMap.put("message", "Account created successfully");
		responseMap.put("token", token);
		return ResponseEntity.ok(responseMap);
	}

	/*
	@PostMapping("/user")
	public ResponseEntity<Map<String, Object>> checkUser(
		//@RequestParam User user
		) {

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String checkedUserName = userDetails.getUsername().toString();

		Map<String, Object> responseMap = new HashMap<>();

		if(!checkedUserName.equals(null)) {

			responseMap.put("error", false);
			responseMap.put("userName", checkedUserName);
			responseMap.put("message", "User name was checked");
			return ResponseEntity.ok(responseMap);
		} else {
			responseMap.put("error", true);
			responseMap.put("message", "Invalid name");
			return ResponseEntity.status(500).body(responseMap);
		}
	
		
	}
	*/

}
