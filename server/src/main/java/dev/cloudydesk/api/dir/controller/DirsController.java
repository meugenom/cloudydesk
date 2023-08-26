package dev.cloudydesk.api.dir.controller;

import dev.cloudydesk.api.file.controller.FilesController;
import dev.cloudydesk.api.file.model.Files;
import dev.cloudydesk.api.file.repository.FilesRepository;
import dev.cloudydesk.api.fileStorage.service.FileStorageService;
import dev.cloudydesk.api.users.model.Users;
import dev.cloudydesk.api.users.repository.UsersRepository;
import dev.cloudydesk.api.dir.model.Dir;
import dev.cloudydesk.api.dir.model.GraphNode;
import dev.cloudydesk.api.dir.repository.DirRepository;
import dev.cloudydesk.api.dir.service.DirService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/dirs")
public class DirsController {

    private static final Logger logger = LoggerFactory.getLogger(FilesController.class);
	

    @Autowired
	private UsersRepository usersRepository;

    @Autowired
    private DirRepository dirRepository;

    /**
	 * Create new dir
	 * @param body
	 * @return ResponseEntity<Map<String, Object>>
	 */
    @PostMapping("/dir")
	public ResponseEntity<Map<String, Object>> createDir(
			@RequestBody Map<String, String> body) {

        logger.info("createDir() called");

		//create response map
		Map<String, Object> responseMap = new HashMap<>();

		// get current user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		if (currentUser != null && body.get("dirName") != null) {
			
			//get id from currentUser
			Long createUserId = currentUser.getId();

			//casting string data to Long
			Long parentId = Long.parseLong(body.get("parentId"));			

			//TODO: need to check if dirName is not  unique and save it with new name + (1) or (2) etc
			// made it on frontend

			try{

			// save file data in the repo
			Dir currentDir = new Dir(
                    body.get("dirName"),
                    parentId,
                    createUserId
            );

			// save new dir in database
			dirRepository.save(currentDir);

			
            responseMap.put("id", currentDir.getId());
			responseMap.put("name", currentDir.getDirName());			
            responseMap.put("parentId", currentDir.getParentId());
            responseMap.put("createdUserId", currentDir.getCreatedUserId());
            responseMap.put("isDirectory", currentDir.isDirectory());
            
            responseMap.put("error", false);
		    responseMap.put("message", "Dir created successfully");

			return ResponseEntity.ok(responseMap);

			}catch(EntityNotFoundException ex){

				responseMap.put("error", true);
		        responseMap.put("message", "Invalid operation");
		        return ResponseEntity.status(500).body(responseMap);
			}
		}

		responseMap.put("error","true");
		responseMap.put("errorName","User doesn't exist");
		return ResponseEntity.status(403).body(responseMap);
	}

	/**
	 * Edit dir
	 * @param body
	 * @return ResponseEntity<Map<String, Object>>
	 */
	@PutMapping("/dir")
	public ResponseEntity<Map<String, Object>> editDir(
			@RequestBody Map<String, String> body) {

		logger.info("editDir() called");

		//create response map
		Map<String, Object> responseMap = new HashMap<>();

		// get current user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		if (currentUser != null && body.get("dirName") != null) {

			//casting string data to Long
			Long id = Long.parseLong(body.get("id"));
			Long parentId = Long.parseLong(body.get("parentId"));
			String dirName = body.get("dirName");

			//TODO: need check if new dirName is not  unique and save it with new name + (1) or (2) etc
			//made it on frontend

			try{

			//get existed dor from our repository
			Dir currentDir = dirRepository.getOne(id);

				// save file data in the repo
			currentDir.setDirName(dirName);
			currentDir.setParentId(parentId);						

			// save new dir in database
			dirRepository.save(currentDir);

			
			responseMap.put("id", currentDir.getId());
			responseMap.put("name", currentDir.getDirName());			
			responseMap.put("parentId", currentDir.getParentId());
			responseMap.put("createdUserId", currentDir.getCreatedUserId());
			responseMap.put("isDirectory", currentDir.isDirectory());
			
			responseMap.put("error", false);
		    responseMap.put("message", "Dir edited successfully");

			return ResponseEntity.ok(responseMap);

			}catch(EntityNotFoundException ex){

				responseMap.put("error", true);
		        responseMap.put("message", "Invalid operation");
		        return ResponseEntity.status(500).body(responseMap);
			}
		}

		responseMap.put("error","true");
		responseMap.put("errorName","User doesn't exist");
		return ResponseEntity.status(403).body(responseMap);
	}

	/**
	 * Delete dir
	 * @param body
	 * @return ResponseEntity<Map<String, Object>>
	 */
	@DeleteMapping("/dir")
	public ResponseEntity<Map<String, Object>> deleteDir(
			@RequestBody Map<String, String> body) {

		logger.info("deleteDir() called");

		//create response map
		Map<String, Object> responseMap = new HashMap<>();

		// get current user
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Users currentUser = usersRepository.getIdByEmail(authentication.getName());

		if (currentUser != null && body.get("id") != null) {

			//casting string data to Long
			Long id = Long.parseLong(body.get("id"));

			try{

			//get existed dor from our repository
			Dir currentDir = dirRepository.getOne(id);

			// delete dir from database
			dirRepository.delete(currentDir);

			responseMap.put("error", false);
		    responseMap.put("message", "Dir deleted successfully");

			return ResponseEntity.ok(responseMap);

			}catch(EntityNotFoundException ex){

				responseMap.put("error", true);
		        responseMap.put("message", "Invalid operation");
		        return ResponseEntity.status(500).body(responseMap);
			}
		}

		responseMap.put("error","true");
		responseMap.put("errorName","User doesn't exist");
		return ResponseEntity.status(403).body(responseMap);
	}
	
}
