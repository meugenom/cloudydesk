package dev.neetcloud.api.directories.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;

import dev.neetcloud.api.file.model.Files;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@EqualsAndHashCode
@Entity(name = "DIR_NODE")
@Table(name = "dir_node")

public class DirNode {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(name = "dir_name")
	private String dirName;

	@Column(name = "files")	
	private ArrayList<Files> files;

	@Column(name = "is_directory")
    private boolean isDirectory;

	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Long parent;

	public DirNode(
			String name,
			Long parent,
			ArrayList<Files> files) {
		this.dirName = name;
		this.parent = parent;
		this.files = new ArrayList<Files>();
		this.files = files;
	}

	public void setRoot() {
		this.dirName = "/";
		this.parent = null;
		this.files = new ArrayList<Files>();		
	}
}
