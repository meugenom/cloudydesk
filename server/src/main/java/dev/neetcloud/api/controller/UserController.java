package dev.neetcloud.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.neetcloud.api.model.User;
import dev.neetcloud.api.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private UserRepository userRepository;

	@GetMapping(value = "/whoami")
	public ResponseEntity<Map<String, Object>> getUser() {
		Map<String, Object> responseMap = new HashMap<>();

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User currentUser = userRepository.getIdByUsername(authentication.getName());

		if (currentUser != null) {
			responseMap.put("error", false);
			responseMap.put("userName", authentication.getName());
			responseMap.put("message", "User name was checked");
			return ResponseEntity.ok(responseMap);
		} else {
			responseMap.put("error", true);
			responseMap.put("message", "Invalid name");
			return ResponseEntity.status(500).body(responseMap);
		}
	}
}
