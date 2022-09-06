package dev.neetcloud.api.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
//import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("files")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class File {

	@Id
	private String id;
	private String name;
	private String type;
	private String path;
	private Long size;
	private String createdDate;
	private String modifiedDate;
	private String createdUser;
	private String modifiedUser;

	@Override
	public String toString() {
		return "{" +
				"id : " + id +
				", name : " + name +
				", type : " + type +
				", path : " + path +
				", size : " + size +
				", createdDate : " + createdDate +
				", modifiedDate : " + modifiedDate +
				", createdUser : " + createdUser +
				", modifiedUser : " + modifiedUser +
				"}";
	}
}
