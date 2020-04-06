package com.group.services;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.group.classes.Picture;
import com.group.controllers.LoginController;
import com.group.repositories.PictureRepository;

@Service
public class PictureService {

	@Autowired
	PictureRepository pr;
	
	public Picture setPicture(MultipartFile file, HttpServletRequest req) throws Exception {
		String fileName = StringUtils.cleanPath(file.getName());
		//String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String user = LoginController.getSeshObj(req).getUsername();
		try {
			if(fileName.contains("..")) {
                throw new Exception("Sorry! Filename contains invalid path sequence " + fileName);
			}
			Picture pic = new Picture(user, fileName, file.getContentType(), file.getBytes(), 1);
			pr.setEnabledForUsername(0, user);
			return pr.save(pic);
			
		} catch(IOException ex) {
			throw new Exception("Could not store file " + fileName + ". Please try again!", ex);
		}
	}
	
    public Picture getPicture(String username) {
        return pr.findPictureByUsernameAndEnabled(username, 1);
    }
    
}
