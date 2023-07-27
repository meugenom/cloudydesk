package dev.cloudydesk.api.auth.utils;

import jakarta.servlet.http.Cookie;

public class UtilsCookie {
	
	private static final int MAX_AGE = 7 * 24 * 60 * 60; // expires in 7 days
	private static final boolean SECURE = true;
	private static final boolean HTTP_ONLY = true;
	private static final String PATH = "/";
	private static Cookie cookie;

	public static Cookie getCookie(String jwt) {

			cookie = new Cookie("jwt", jwt);
            cookie.setMaxAge(MAX_AGE); // expires in 7 days
            //cookie.setSecure(SECURE);
            cookie.setHttpOnly(HTTP_ONLY);
            cookie.setPath(PATH); // Global

			return cookie;
	}
}
