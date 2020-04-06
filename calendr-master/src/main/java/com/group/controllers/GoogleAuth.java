package com.group.controllers;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.Calendar;
import java.util.Collections;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets.Details;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.CalendarScopes;
import com.google.gson.Gson;
import com.group.classes.GoogleCreds;

@Component
public class GoogleAuth {
	private final static Log logger = LogFactory.getLog(GoogleAuth.class);
	private static final String APPLICATION_NAME = "Calendr";
	private static HttpTransport httpTransport;
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	private static com.google.api.services.calendar.Calendar client;

	private GoogleClientSecrets clientSecrets;
	private GoogleAuthorizationCodeFlow flow;
	private Credential credential;
	
	@Autowired
	private GoogleCreds creds;
		
	private DateTime getDate(boolean addSevenDays) {
		DateTime date = new DateTime(new Date());
		
		if(addSevenDays) {
		  	Calendar x = Calendar.getInstance();
			x.add(Calendar.DATE, 7);
			date = new DateTime(x.getTime());
		}
		
		return date;
	}
	
	public String auth() throws GeneralSecurityException, IOException {
		AuthorizationCodeRequestUrl authorizationUrl;
		if (flow == null) {
			Details web = new Details();
			web.setClientId(creds.getClientId());
			web.setClientSecret(creds.getClientSecret());
			clientSecrets = new GoogleClientSecrets().setWeb(web);
			httpTransport = GoogleNetHttpTransport.newTrustedTransport();
			flow = new GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY, clientSecrets,
					Collections.singleton(CalendarScopes.CALENDAR)).build();
		}
		authorizationUrl = flow.newAuthorizationUrl().setRedirectUri(creds.getRedirectUri());
		System.out.println("cal authorizationUrl->" + authorizationUrl);
		
		return authorizationUrl.build();
	}

	public ResponseEntity<String> getEvents(@RequestParam(value = "code") String code){
		com.google.api.services.calendar.model.Events eventList;
		String message;
		Gson g = new Gson();
		HttpStatus status;
		try {
			code = URLDecoder.decode(code, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		try {
			TokenResponse response = flow.newTokenRequest(code).setGrantType("authorization_code").setRedirectUri(creds.getRedirectUri()).execute();
			System.out.println("access token: " + response.getAccessToken());
			
			credential = flow.createAndStoreCredential(response, "userID");
			
			client = new com.google.api.services.calendar.Calendar.Builder(httpTransport, JSON_FACTORY, credential)
					.setApplicationName(APPLICATION_NAME).build();
			
			com.google.api.services.calendar.Calendar.Events events = client.events();
			
			eventList = events.list("primary").setMaxResults(7).setTimeMin(getDate(false)).setTimeMax(getDate(true)).execute();
									
			message = g.toJson(eventList);
			status = HttpStatus.OK;
		} catch (Exception e) {
			message = "Exception while handling OAuth2 callback (" + e.getMessage() + ")."
					+ " Redirecting to google connection status page.";
			logger.warn(message);
			message = g.toJson(message);
			status = HttpStatus.I_AM_A_TEAPOT;
		}

		return new ResponseEntity<>(message, status);
	}
	
}
