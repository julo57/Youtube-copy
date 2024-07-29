package com.youtubeclone.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youtubeclone.model.User;
import com.youtubeclone.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/set-role")
    public ResponseEntity<String> setRole(@RequestBody Map<String, String> roleChangeRequest) {
        String username = roleChangeRequest.get("username");
        String role = roleChangeRequest.get("role");
        userService.setUserRole(username, role);
        return ResponseEntity.ok("Role updated successfully");
    }
}
