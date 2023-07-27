package dev.cloudydesk.api.config;

import dev.cloudydesk.api.UserSecurity.dao.JpaUserDetailsService;
import dev.cloudydesk.api.auth.utils.UtilsCookie;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JpaUserDetailsService jpaUserDetailsService;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        final String userEmail;
        String jwtToken = null;
		

		if(request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("jwt")) {
					jwtToken = cookie.getValue();
				}
			}
		}
		
        if (jwtToken == null || jwtToken == "") {
            //add to the resonse information about error and status 401 Error
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            filterChain.doFilter(request, response);
            return;
        }else{
            
            System.out.println("jwtToken: " + jwtToken);            
            Boolean isExpired = false;
            
            try{
                isExpired= jwtUtils.isTokenExpired(jwtToken);
                //check jwtToken is expired and return response if expired throw exception
            
            }catch(ExpiredJwtException e){
                //System.out.println("jwtToken is expired");
                isExpired = true;

                //if jwtToken is expired, delete cookie with expired jwtToken
                response.addCookie(UtilsCookie.getCookie(null));
                
                //add to the resonse information about error and status 403 Error
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                filterChain.doFilter(request, response);
                return;
            }
        }

        // by default, the user is not authenticated ...has to be set manually
        userEmail = jwtUtils.extractUsername(jwtToken);
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = jpaUserDetailsService.loadUserByUsername(userEmail);
            if (jwtUtils.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						userDetails,
                        null, 
						userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
