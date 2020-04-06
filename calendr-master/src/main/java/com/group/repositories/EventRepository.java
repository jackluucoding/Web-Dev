package com.group.repositories;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.group.classes.Event;

@Repository
@Transactional(readOnly = true)
public interface EventRepository extends CrudRepository<Event, String> {

	ArrayList<Event> findEventByUsernameAndEnabled(String username, int enabled);
	
	@Modifying
	@Query("UPDATE Event e SET e.enabled = ?1 WHERE e.id = ?2")
	@Transactional(timeout = 5)
	int setEnabledForId(int enabled, int id);

	@Query("SELECT e.category FROM Event e WHERE e.username = ?1 AND e.enabled = ?2")
	ArrayList<String> findCategoryByUsernameAndEnabled(String username, int enabled);
}
