package com.youtubeclone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youtubeclone.model.User;
import com.youtubeclone.service.JwtService;
import com.youtubeclone.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.checkIfUserExists(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        try {
            System.out.println("Attempting login for user: " + loginRequest.getUsername());
            System.out.println("Password received: " + loginRequest.getPassword());

            UserDetails userDetails = userService.loadUserByUsername(loginRequest.getUsername());
            System.out.println("Found user in DB: " + userDetails.getUsername());
            System.out.println("Encoded password in DB: " + userDetails.getPassword());

            boolean isPasswordMatch = passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword());
            System.out.println("Password match result: " + isPasswordMatch);

            if (!isPasswordMatch) {
                System.out.println("Password mismatch for user: " + loginRequest.getUsername());
                throw new Exception("Invalid password");
            }

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtService.generateToken(authentication);
            return ResponseEntity.ok(jwt);
        } catch (Exception e) {
            System.out.println("Authentication failed for user: " + loginRequest.getUsername());
            System.out.println("Exception: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetails> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(userDetails);
    }
}
