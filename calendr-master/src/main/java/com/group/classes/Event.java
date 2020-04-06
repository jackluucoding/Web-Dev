package com.group.classes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "event", schema = "calendr")
public class Event {
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int eventId;
	private String title;
	@Column(name="start_time")
	private String startTime;
	@Column(name="end_time")
	private String endTime;
	private String category, location, description, username;
	private int enabled;

	public Event() {
	}

	@Override
	public String toString() {
		return "Event [title=" + title + ", startTime=" + startTime + ", endTime=" + endTime + ", category=" + category
				+ ", location=" + location + ", description=" + description + ", username=" + username + ", eventId="
				+ eventId + "]";
	}

	public Event(String title, String startTime, String endTime, String category, String username, int enabled) {
		this.title = title;
		this.startTime = startTime;
		this.endTime = endTime;
		this.category = category;
		this.username = username;
		this.enabled = enabled;
	}

	public Event(String title, String startTime, String endTime, String category, String username, int enabled, String location,
			String description) {
		this(title, startTime, endTime, category, username, enabled);
		this.location = location;
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public int getEventId() {
		return eventId;
	}
	
	public void setEventId(int eventId) {
		this.eventId = eventId;
	}
	
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	
	public int getEnabled() {
		return enabled;
	}

}
