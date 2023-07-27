package dev.cloudydesk.api.users.service;

import dev.cloudydesk.api.users.requests.UsersRequest;
import dev.cloudydesk.api.users.model.Users;

import java.util.List;

public interface UsersService {
    
	//get all users
	public List<Users> GetAllUsers();
	
	//add user
    public Users AddUser(UsersRequest user);

}
