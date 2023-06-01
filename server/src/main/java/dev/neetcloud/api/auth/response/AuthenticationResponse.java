package dev.neetcloud.api.auth.response;

import dev.neetcloud.api.users.model.Users;

public class AuthenticationResponse extends Users {

    public AuthenticationResponse(String firstName, String lastName, String email, String roles, Boolean isActive) {

        //password is null
        super(firstName, lastName, email, "", roles, isActive);
    }

}

