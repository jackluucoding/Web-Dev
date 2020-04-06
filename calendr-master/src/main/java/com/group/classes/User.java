package com.group.classes;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user", schema = "calendr")
public class User implements Serializable{
	private static final long serialVersionUID = 1L;

	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Id
	private String username;
	private String password;
	private String email;
	@Column(name="first_name")
	private String firstName;
	@Column(name="last_name")
	private String lastName;
	private String telephone;
	private int enabled;
	
	public User () {}
	
	public User(String username, String password, String email, String firstname, String lastname, String telephone) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.firstName = firstname;
		this.lastName = lastname;
		this.telephone = telephone;
	}
	
	public User(String username, String password, String email, String firstname, String lastname, String telephone, int enabled) {
		this(username, password, email, firstname, lastname, telephone);
		this.enabled = enabled;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() { return password; }

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getFirstname() {
		return firstName;
	}

	public void setFirstname(String firstname) {
		this.firstName = firstname;
	}

	public String getLastname() {
		return lastName;
	}

	public void setLastname(String lastname) {
		this.lastName = lastname;
	}
	
	public int getEnabled() {
		return enabled;
	}
	
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	
	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", email=" + email + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", telephone=" + telephone + ", enabled=" + enabled + "]";
	}
	
}
