package dev.neetcloud.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("api/")
public class UserController {
    
	@GetMapping(value="/whoami")
	public ResponseEntity<Map<String, Object>> getUser(){
        
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> responseMap = new HashMap<>();

		if(authentication.getName()!=null){
			responseMap.put("error", false);
			responseMap.put("userName", authentication.getName());
			responseMap.put("message", "User name was checked");
			return ResponseEntity.ok(responseMap);
		}else{
			responseMap.put("error", true);
			responseMap.put("message", "Invalid name");
			return ResponseEntity.status(500).body(responseMap);
		}
    }
}


