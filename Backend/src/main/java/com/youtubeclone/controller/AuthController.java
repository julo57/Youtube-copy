package com.youtubeclone.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youtubeclone.model.User;
import com.youtubeclone.service.JwtService;
import com.youtubeclone.service.UserService;
import com.youtubeclone.service.UserSettingsService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserSettingsService userSettingsService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.checkIfUserExists(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        if (userService.checkIfEmailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already taken");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(List.of("USER")); // Set default role as USER
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
                return ResponseEntity.status(401).body("Invalid username or password");
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
    public ResponseEntity<User> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok(user);
    }

    @GetMapping("/subscriptions/{username}")
    public ResponseEntity<List<User>> getUserSubscriptions(@PathVariable String username) {
        try {
            List<User> subscriptions = userSettingsService.getSubscriptions(username);
            if (subscriptions != null && !subscriptions.isEmpty()) {
                return ResponseEntity.ok(subscriptions);
            } else {
                return ResponseEntity.status(404).body(null); // Return 404 if no subscriptions are found
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Return 500 in case of an error
        }
    }
}
