package com.group.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.group.classes.User;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends CrudRepository<User, String>{
	
	User findUserByUsernameAndEnabled(String username, int enabled);
	User findUserByUsernameAndPasswordAndEnabled(String username, String password, int enabled);
	
}