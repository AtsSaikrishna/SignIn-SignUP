package com.LoginRegistration.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.LoginRegistration.app.entity.Users;
import com.LoginRegistration.app.requests.LoginRequest;

import com.LoginRegistration.app.services.UserServices;

@RestController
public class UserController {
	
	@Autowired
	UserServices userService;
	
	@PostMapping("/addUser") 
	@CrossOrigin(origins = "http://localhost:5173")
	public Users addUser(@RequestBody Users user) {
		return userService.addUser(user);
	}
	
	@PostMapping("/loginUser")
	@CrossOrigin(origins = "http://localhost:5173")
	public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
		return userService.loginUser(loginRequest);
		
   }
}
