package dev.neetcloud.api.auth.response;

public class AuthenticationResponse {
    private String token;
    private String email;
	private boolean isAuthenticated;

    public AuthenticationResponse(String email, String token) {
        this.token = token;
        this.email = email;
		this.isAuthenticated = true;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

