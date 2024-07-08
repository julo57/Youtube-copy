package com.youtubeclone.service;

import com.youtubeclone.model.User;
import com.youtubeclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void register(User user) {
        userRepository.save(user);
    }

    public boolean authenticate(User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        return foundUser != null && foundUser.getPassword().equals(user.getPassword());
    }
}
