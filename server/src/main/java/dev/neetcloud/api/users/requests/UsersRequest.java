package dev.neetcloud.api.users.requests;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsersRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String roles;
}
