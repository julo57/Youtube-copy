package com.youtubeclone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youtubeclone.model.User;
import com.youtubeclone.repository.UserRepository;

@Service
public class UserSettingsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get the subscriptions of a user.
     *
     * @param username the username of the user
     * @return the list of subscriptions
     */
    public List<User> getSubscriptions(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.map(User::getSubscriptions).orElse(null);
    }

    /**
     * Update playback speed for a user.
     *
     * @param username the username of the user
     * @param playbackSpeed the playback speed to set
     * @return the updated user
     */
    public User updatePlaybackSpeed(String username, String playbackSpeed) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPlaybackSpeed(playbackSpeed);
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Update video quality for a user.
     *
     * @param username the username of the user
     * @param quality the video quality to set
     * @return the updated user
     */
    public User updateVideoQuality(String username, String quality) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setQuality(quality);
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Get playback speed for a user.
     *
     * @param username the username of the user
     * @return the playback speed
     */
    public String getPlaybackSpeed(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.map(User::getPlaybackSpeed).orElse(null);
    }

    /**
     * Get video quality for a user.
     *
     * @param username the username of the user
     * @return the video quality
     */
    public String getVideoQuality(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        return optionalUser.map(User::getQuality).orElse(null);
    }
}
