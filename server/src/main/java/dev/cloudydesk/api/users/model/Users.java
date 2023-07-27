package dev.cloudydesk.api.users.model;

import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

/**
 * @author meugenom
 * @since 2023-05-01
 */

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@EqualsAndHashCode
@Entity(name = "Users")
@Table(name = "users", uniqueConstraints = @UniqueConstraint(name = "personal_email_unique", columnNames = "email"))
public class Users {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "first_name", nullable = false)
	private String firstName;

    @Column(name = "last_name")
    private String lastName;
    
	@Column(name = "email", nullable = false)
    private String email;

    @Column(name = "roles", nullable = false)
    private String roles;

	@Column(name = "is_active", nullable = false)
	private Boolean isActive;

	//constructor
	public Users(
				 String firstName, 
				 String lastName, 
				 String email, 
				 String password,
				 String roles, 
				 Boolean is_active ) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.roles = roles;
		this.isActive = is_active;
		this.password = password;
	}

    @ToString.Exclude
    @Column(name = "password", nullable = false, columnDefinition = "text")
    private String password;

}
