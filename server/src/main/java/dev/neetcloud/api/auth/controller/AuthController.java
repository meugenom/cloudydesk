package dev.neetcloud.api.auth.controller;

import dev.neetcloud.api.UserSecurity.dao.JpaUserDetailsService;

import dev.neetcloud.api.auth.exception.NotFoundException;
import dev.neetcloud.api.auth.request.AuthenticationRequest;
import dev.neetcloud.api.auth.response.AuthenticationResponse;
import dev.neetcloud.api.auth.service.AuthService;
import dev.neetcloud.api.auth.utils.UtilsCookie;
import dev.neetcloud.api.config.JwtUtils;
import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.requests.UsersRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.hibernate.exception.ConstraintViolationException;
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

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthenticationManager authenticationManager;

	private final JpaUserDetailsService jpaUserDetailsService;

	private final AuthService authService;

	private final JwtUtils jwtUtils;

	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request,
			HttpServletResponse response) {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword(),
							new ArrayList<>()));
			final UserDetails user = jpaUserDetailsService.loadUserByUsername(request.getEmail());
			if (user != null) {
				String jwt = jwtUtils.generateToken(user);
				response.addCookie(UtilsCookie.getCookie(jwt));

				AuthenticationResponse authResponse = new AuthenticationResponse(request.getEmail());
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

		String token = jwtUtils.generateToken(jpaUserDetailsService.loadUserByUsername(newUser.getEmail()));
		response.addCookie(UtilsCookie.getCookie(token));

		// Create AuthResponse object with token and user information
		AuthenticationResponse authResponse = new AuthenticationResponse(newUser.getEmail());

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
