package com.LoginRegistration.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LoginRegistration.app.entity.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, String>{

}