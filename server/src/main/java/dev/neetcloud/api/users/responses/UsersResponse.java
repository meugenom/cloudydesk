package dev.neetcloud.api.users.responses;
import dev.neetcloud.api.users.model.Users;

public class UsersResponse extends Users{
    public UsersResponse(String firstName, String lastName, String email, String roles, Boolean isActive) {
        super(firstName, lastName, email, "", roles, isActive);
    }
}
