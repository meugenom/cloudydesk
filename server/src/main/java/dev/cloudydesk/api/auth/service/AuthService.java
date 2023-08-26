package dev.cloudydesk.api.auth.service;

import dev.cloudydesk.api.users.model.Users;
import dev.cloudydesk.api.users.requests.UsersRequest;

import java.util.Optional;

public interface AuthService {
    public Optional<Users> AddUser(UsersRequest user);
}
