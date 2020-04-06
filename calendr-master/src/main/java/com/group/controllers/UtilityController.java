package com.group.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.group.classes.Picture;
import com.group.services.PictureService;

@RestController
public class UtilityController {

	@Autowired
	private PictureService ps;
	
	@PostMapping("/uploadPicture")
	public Picture uploadPicture(MultipartFile file, HttpServletRequest req) throws Exception {
		return ps.setPicture(file, req);
	}
	
	@GetMapping("/downloadPicture")
	public ResponseEntity<?> downloadPicture(HttpServletRequest req){
		try {
			Picture pic = ps.getPicture(LoginController.getSeshObj(req).getUsername());
		
			return ResponseEntity.ok()
			.contentType(MediaType.parseMediaType(pic.getFileType()))
			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pic.getFileName() + "\"")
			.body(new ByteArrayResource(pic.getData()));
			
		} catch(NullPointerException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}
