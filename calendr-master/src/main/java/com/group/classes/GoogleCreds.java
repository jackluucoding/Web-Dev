package com.group.classes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GoogleCreds {
	private String clientId, clientSecret, redirectUri;
	
	@Autowired
	public GoogleCreds(@Value("${google.client.client-id}")String id, @Value("${google.client.client-secret}")String secret, @Value("${google.client.redirectUri}")String uri) {
		this.clientId = id;
		this.clientSecret = secret;
		this.redirectUri = uri;
	}

	public String getClientId() {
		return clientId;
	}

	public String getClientSecret() {
		return clientSecret;
	}

	public String getRedirectUri() {
		return redirectUri;
	}
	
	@Override
	public String toString() {
		return "id: " + clientId + " secret: " + clientSecret + " URI " + redirectUri;
	}
	
}
