package dev.neetcloud.api.auth.response;

public class AuthenticationResponse {
    private String email;
	private boolean isAuthenticated;

    public AuthenticationResponse(String email) {
        this.email = email;
		this.isAuthenticated = true;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public boolean getIsAuthenticated() {
		return isAuthenticated;
	}
	
}

