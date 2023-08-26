package dev.cloudydesk.api.users.model;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

public class UsersTest {

	//test create new
	@Test
	@DisplayName("Сreate new user with username and password")
	public void testCreateNewUser() {
		Users user = new Users("firstUserName", "lastUserName", "user@web.de", "password", "ROLE_USER", true);
		assertTrue(user.getFirstName().equals("firstUserName"));
		assertTrue(user.getLastName().equals("lastUserName"));
		assertTrue(user.getEmail().equals("user@web.de"));
		assertTrue(user.getPassword().equals("password"));
		assertTrue(user.getRoles().equals("ROLE_USER"));
		//assertTrue(user.getIs_active().equals(true));
	}

	public static class UsersRepositoryTest {

	}
}
