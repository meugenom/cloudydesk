package dev.neetcloud.api.auth.service;

import dev.neetcloud.api.users.model.Users;
import dev.neetcloud.api.users.requests.UsersRequest;

import java.util.Optional;

public interface AuthService {
    public Optional<Users> AddUser(UsersRequest user);
}
