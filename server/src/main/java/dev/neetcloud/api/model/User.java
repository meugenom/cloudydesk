package dev.neetcloud.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	private String id;
	private String userName;
	@Indexed(unique = true)
	private String email;
	private String password;
	private String role;
	private String imageUrl;
	private String createDate;
	private String editDate;
}