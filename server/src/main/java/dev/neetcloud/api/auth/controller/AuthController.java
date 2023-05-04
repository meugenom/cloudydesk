package dev.neetcloud.api.auth.controller;

import dev.neetcloud.api.UserSecurity.dao.JpaUserDetailsService;
import dev.neetcloud.api.UserSecurity.model.UserSecurity;
import dev.neetcloud.api.auth.request.AuthenticationRequest;
import dev.neetcloud.api.auth.response.AuthenticationResponse;
import dev.neetcloud.api.auth.service.AuthService;
import dev.neetcloud.api.config.JwtUtils;
import dev.neetcloud.api.users.requests.UsersRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword(),
                            new ArrayList<>()));
            final UserDetails user = jpaUserDetailsService.loadUserByUsername(request.getEmail());
            if (user != null) {
                String jwt = jwtUtils.generateToken(user);
                Cookie cookie = new Cookie("jwt", jwt);
                cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
//                cookie.setSecure(true);
                cookie.setHttpOnly(true);
                cookie.setPath("/"); // Global
                response.addCookie(cookie);

				AuthenticationResponse authResponse = new AuthenticationResponse(request.getEmail(), jwt);				
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
    public ResponseEntity<UserSecurity> register(@RequestBody UsersRequest user) throws Exception {
	
        return ResponseEntity.ok(authService.AddUser(user).map(UserSecurity::new).orElseThrow(() -> new Exception("Unknown")));
    }

	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletResponse response) {
		//Delete user from context userDetailsService
		SecurityContextHolder.getContext().setAuthentication(null);

		// delete cookie jwt from client
		Cookie cookie = new Cookie("jwt", null);
		cookie.setMaxAge(0);
		//cookie.setHttpOnly(true);
		cookie.setPath("/"); // Global
		response.addCookie(cookie);
		return ResponseEntity.ok().body("Logged out");
	}

}
