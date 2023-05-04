package dev.neetcloud.api.file.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@EqualsAndHashCode
@Entity(name = "Files")
@Table(name = "files")
public class Files {

	@Id
	@Column(name = "id", nullable = false)
	private String id;

	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "type", nullable = false)
	private String type;

	@Column(name = "path", nullable = false)
	private String path;

	@Column(name = "size", nullable = false)
	private Long size;

	@Column(name = "created_date", nullable = false)
	private LocalDate createdDate;

	@Column(name = "modified_date", nullable = false)
	private LocalDate modifiedDate;

	@Column(name = "created_user_id", nullable = false)
	private Long createdUserId;

	@Column(name = "modified_user_id", nullable = false)
	private Long modifiedUserId;

	// default constructor
	public Files(   String name, 
					String type, 
					String path, 
					Long size, 
					Long createdUserId, 
					Long modifiedUserId
				) {
		this.id = UUID.randomUUID().toString(); // generate a random UUID as the file ID
		this.name = name;
		this.type = type;
		this.path = path;
		this.size = size;
		this.createdDate = LocalDate.now();
		this.modifiedDate = LocalDate.now();
		this.createdUserId = createdUserId;
		this.modifiedUserId = modifiedUserId;
	}
}
