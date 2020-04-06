package com.group.controllers;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Map;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.servlet.http.HttpServletRequest;

import net.bytebuddy.implementation.bind.MethodDelegationBinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.group.classes.*;
import com.group.repositories.*;

@Controller
@RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
public class LoginController {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;

	 @PostMapping(value = "/calendar") 
	 public ModelAndView calendar(ModelMap model, HttpServletRequest req) {
		 model.addAttribute("user", getSeshObj(req));
		 return new ModelAndView("calendar", model);
	 }

	  static void paramMap(HttpServletRequest req){
	 	Enumeration<String> params = req.getParameterNames();
		Enumeration<String> headerNames = req.getHeaderNames();

		while(params.hasMoreElements()){
			String paramName = params.nextElement();
			System.out.println("Parameter Name - "+paramName+", Value - "+req.getParameter(paramName));
		}
		while(headerNames.hasMoreElements()){
			String headerName = headerNames.nextElement();
			System.out.println("Header Name - " + headerName + ", Value - " + req.getHeader(headerName));
		}
	 }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@PostMapping(value = "/login")
	public @ResponseBody String login(@RequestParam Map<String, String> body, HttpServletRequest req)
			throws ClassNotFoundException, SQLException {
	 	String username = body.get("username");
	 	String password = body.get("password");
		User user = userRepo.findUserByUsernameAndEnabled(username, 1);
		try {
			boolean pw = passwordEncoder.matches(password, user.getPassword());
			if(pw){
				setSession(req, user);
				return "success";
			}
		}catch(NullPointerException npe){
			System.out.println(Arrays.toString(npe.getStackTrace()));
		}

	 	return "error";
	}

	@PostMapping(value = "/register")
	public @ResponseBody String register(@RequestParam Map<String, String> body, HttpServletRequest req)
			throws ClassNotFoundException, SQLException {
		String username, password, email, firstName, lastName, telephone;

		username = body.get("username");
		password = passwordEncoder.encode(body.get("password"));
		email = body.get("email");
		firstName = body.get("name").substring(0, body.get("name").indexOf(" "));
		lastName = body.get("name").substring(body.get("name").indexOf(" ") + 1);
		telephone = body.get("telephone");
		User user = new User(username, password, email, firstName, lastName, telephone, 1);
		userRepo.save(user);

		setSession(req, user);
		return "redirect:/calendar";
	}

	private void setSession(HttpServletRequest req, User user) {
		try {
			req.getSession().setAttribute("user", user);
		} catch (NullPointerException e) {
			System.out.println(e);
		}
	}

	public static User getSeshObj(HttpServletRequest req) {
		return (User) req.getSession().getAttribute("user");
	}

	@PostMapping(value = "/logout")
	public @ResponseBody void logout(HttpServletRequest req) {
		req.getSession().invalidate();
	}

}