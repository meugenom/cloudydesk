package dev.cloudydesk.api.dir.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "dirs")

public class Dir {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", nullable = false)
	private String dirName;

	@Column(name = "parent_id")
	private Long parentId;

	@Column(name = "created_user_id")
	private Long createdUserId;

	@Column(name = "is_directory")
	private boolean isDirectory;

	public Dir(
			String name,
			Long parentId,
			Long createdUserId) {
		this.dirName = name;
		this.parentId = parentId;
		this.createdUserId = createdUserId;
		this.isDirectory = true;
	}
}
