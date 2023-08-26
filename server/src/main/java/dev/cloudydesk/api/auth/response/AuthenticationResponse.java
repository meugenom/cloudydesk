package dev.cloudydesk.api.auth.response;

import dev.cloudydesk.api.users.model.Users;

public class AuthenticationResponse extends Users {

    public AuthenticationResponse(String firstName, String lastName, String email, String roles, Boolean isActive) {

        //password is null
        super(firstName, lastName, email, "", roles, isActive);
    }

}

