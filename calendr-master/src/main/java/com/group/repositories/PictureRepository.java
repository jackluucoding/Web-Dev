package com.group.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.group.classes.Picture;

@Repository
@Transactional(readOnly = true)
public interface PictureRepository extends CrudRepository<Picture, String>{
	Picture findPictureByUsernameAndEnabled(String username, int enabled);
	
	@Modifying
	@Query("UPDATE Picture p SET p.enabled = ?1 WHERE p.username = ?2 AND p.enabled = 1")
	@Transactional(timeout = 5)
	int setEnabledForUsername(int enabled, String username);
	
}
