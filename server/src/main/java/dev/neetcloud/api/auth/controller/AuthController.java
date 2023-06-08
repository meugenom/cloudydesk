package dev.neetcloud.api.auth.controller;

import dev.neetcloud.api.UserSecurity.dao.JpaUserDetailsService;

import dev.neetcloud.api.auth.exception.NotFoundException;
import dev.neetcloud.api.auth.response.AuthenticationResponse;
import dev.neetcloud.api.auth.service.AuthService;
import dev.neetcloud.api.auth.utils.UtilsCookie;
import dev.neetcloud.api.config.JwtUtils;
import dev.neetcloud.api.dir.service.DirService;
import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.repository.UsersRepository;
import dev.neetcloud.api.users.requests.UsersRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthenticationManager authenticationManager;

	private final JpaUserDetailsService jpaUserDetailsService;

	private final AuthService authService;

	private final JwtUtils jwtUtils;

	private final DirService dirService;

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UsersRepository usersRepository;

	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody Users request,
			HttpServletResponse response) {
		try {
			String email = request.getEmail();
			String password = request.getPassword();

			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(email, password,
							new ArrayList<>()));
			final UserDetails user = jpaUserDetailsService.loadUserByUsername(request.getEmail());
			if (user != null) {
				String jwt = jwtUtils.generateToken(user);
				// add cookie to response
				response.addCookie(UtilsCookie.getCookie(jwt));

				// prepare authResponse
				AuthenticationResponse authResponse = new AuthenticationResponse("", "", email, "", false);

				// check info and add additional fileds
				Optional<Users> userOptional = usersRepository.findByEmail(user.getUsername());
				if (userOptional.isPresent()) {
					Users result = userOptional.get();
					authResponse.setId(result.getId());
					authResponse.setFirstName(result.getFirstName());
					authResponse.setLastName(result.getLastName());
					authResponse.setRoles(result.getRoles());
					authResponse.setIsActive(result.getIsActive());
				}

				ObjectMapper objectMapper = new ObjectMapper();
				String json = objectMapper.writeValueAsString(authResponse);
				return ResponseEntity.ok().body(json);
			}
			return ResponseEntity.status(400).body("Error authenticating");
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(400).body("" + e.getMessage());
		}
	}

	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody UsersRequest user, HttpServletResponse response)
			throws Exception {
		Users newUser;
		try {
			newUser = authService.AddUser(user)
					.orElseThrow(() -> new NotFoundException("User not found"));

		} catch (DuplicateKeyException e) {
			response.addCookie(UtilsCookie.getCookie(null));
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		} catch (DataAccessException e) {
			response.addCookie(UtilsCookie.getCookie(null));
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		} catch (ConstraintViolationException e) {
			response.addCookie(UtilsCookie.getCookie(null));
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		// generate default dirs for new user: apps, docs, desktop, shared, trash
		dirService.addDefaultDirs(newUser.getId());

		// Generate token
		String token = jwtUtils.generateToken(jpaUserDetailsService.loadUserByUsername(newUser.getEmail()));
		response.addCookie(UtilsCookie.getCookie(token));

		// Create AuthResponse object with token and user information
		// AuthenticationResponse authResponse = new
		// AuthenticationResponse(newUser.getEmail());
		AuthenticationResponse authResponse = new AuthenticationResponse(
				"", "", newUser.getEmail(), "", true);
		return ResponseEntity.ok(authResponse);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletResponse response) {
		// Delete user from context userDetailsService
		SecurityContextHolder.getContext().setAuthentication(null);

		// delete cookie jwt from client
		response.addCookie(UtilsCookie.getCookie(null));
		return ResponseEntity.ok().body("Logged out");
	}

}
