package com.group.controllers;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group.classes.Event;
import com.group.repositories.EventRepository;

@RestController
public class EventController {
	
	public EventController() {}

	@Autowired
	private EventRepository eventRepo;
	private Event event;
	private String username;
	@Autowired
	private GoogleAuth ga;
	
	
	@GetMapping(value = "/events")
	public ArrayList<Event> getEvents(HttpServletRequest req) throws ClassNotFoundException, SQLException{
		username = LoginController.getSeshObj(req).getUsername();
		ArrayList<Event> events = new ArrayList<Event>(eventRepo.findEventByUsernameAndEnabled(username, 1));
		events.trimToSize();
		return events;
	}
	
	@PostMapping(value = "/create")
	public Event create(@RequestParam Map<String, String>body, HttpServletRequest req)
			throws ClassNotFoundException, SQLException {
		username = LoginController.getSeshObj(req).getUsername();
		LoginController.paramMap(req);
		event = new Event(body.get("title"), body.get("startDate")+" "+body.get("startTime"), body.get("endTime"),
				formatCategory(body.get("category")), username, 1, body.get("location"), body.get("description"));
		eventRepo.save(event);
		return event;
	}
	
	private String formatCategory(String cat) {
		String pfc = cat.toLowerCase();
		pfc = pfc.substring(0,1).toUpperCase() + pfc.substring(1);
		return pfc;
	}

	@GetMapping("/categories")
	public ArrayList<String> getCategories(HttpServletRequest req){
		String user = LoginController.getSeshObj(req).getUsername();
		return eventRepo.findCategoryByUsernameAndEnabled(user, 1);
	}

	@GetMapping(value = "/auth")
	public String getAuth(HttpServletResponse resp) throws GeneralSecurityException, IOException {
		return ga.auth();
	}
	
	@PostMapping(value = "/importGoogleEvents")
	public ResponseEntity<?> getGoogleEvents(@RequestParam String codeInc, HttpServletResponse response) {
		ResponseEntity<?> events = ga.getEvents(codeInc);
		response.setStatus(events.getStatusCodeValue());
		return events;
	}
	
	@PutMapping(value = "/deleteEvent")
	public void deleteEvent(@RequestParam Map<String, String>body) {
		int id = Integer.parseInt(body.get("eventId"));
		eventRepo.setEnabledForId(0, id);
	}
	
}
