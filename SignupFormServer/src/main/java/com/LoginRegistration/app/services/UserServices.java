package com.LoginRegistration.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LoginRegistration.app.entity.Users;
import com.LoginRegistration.app.repository.UsersRepo;
import com.LoginRegistration.app.requests.LoginRequest;

@Service
public class UserServices {
	
	@Autowired
	UsersRepo usersRepo;
	
	public Users addUser(Users user) {
		
		return usersRepo.save(user);
		
	}
	
	public Boolean loginUser(LoginRequest loginRequest) {
		
		Optional<Users> user = usersRepo.findById(loginRequest.getUserId());
		Users user1 = user.get();
		
		if(user1 == null) {
			return false;
		}
		
		
		
		if(!user1.getPassword().equals(loginRequest.getPassword())) {
			return false;
		}
		
		return true;
		
	}
		
	}