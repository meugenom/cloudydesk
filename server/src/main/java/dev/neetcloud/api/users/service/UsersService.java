package dev.neetcloud.api.users.service;

import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.requests.UsersRequest;

import java.util.List;

public interface UsersService {
    
	//get all users
	public List<Users> GetAllUsers();
	
	//add user
    public Users AddUser(UsersRequest user);

}
