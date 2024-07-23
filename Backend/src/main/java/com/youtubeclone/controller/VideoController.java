package com.youtubeclone.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.youtubeclone.model.Comment;
import com.youtubeclone.model.Video;
import com.youtubeclone.model.WatchedVideo;
import com.youtubeclone.service.VideoService;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file,
                                              @RequestParam("title") String title,
                                              @RequestParam("description") String description,
                                              @RequestParam("username") String username) {
        try {
            videoService.saveVideo(file, title, description, username);
            return ResponseEntity.ok("Video uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Video upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Video>> getAllVideos() {
        try {
            List<Video> videos = videoService.findAll();
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable Long id) {
        try {
            Video video = videoService.findById(id);
            if (video != null) {
                // Get the authenticated username from the security context
                UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                String currentUsername = userDetails.getUsername();
                
                videoService.recordWatchHistory(id, currentUsername);
                return ResponseEntity.ok(video);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeVideo(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            videoService.likeVideo(id, username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<Void> dislikeVideo(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            videoService.dislikeVideo(id, username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<Comment> addComment(@PathVariable Long id, @RequestBody Comment comment) {
        try {
            Comment savedComment = videoService.addComment(id, comment);
            return ResponseEntity.ok(savedComment);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribeToUser(@RequestBody Map<String, String> request) {
        try {
            String subscriber = request.get("subscriber");
            String subscribedTo = request.get("subscribedTo");
            videoService.toggleSubscription(subscriber, subscribedTo);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/subscriptions/count/{username}")
    public ResponseEntity<Long> countSubscriptions(@PathVariable String username) {
        try {
            long count = videoService.countSubscriptions(username);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/check-subscription")
    public ResponseEntity<Boolean> checkSubscription(@RequestParam("subscriber") String subscriber, @RequestParam("subscribedTo") String subscribedTo) {
        try {
            boolean isSubscribed = videoService.isSubscribed(subscriber, subscribedTo);
            return ResponseEntity.ok(isSubscribed);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/watched/{username}")
    public ResponseEntity<List<WatchedVideo>> getWatchedVideos(@PathVariable String username) {
        try {
            List<WatchedVideo> watchedVideos = videoService.getWatchedVideos(username);
            return ResponseEntity.ok(watchedVideos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/user/{username}/videos")
    public ResponseEntity<List<Video>> getUserVideos(@PathVariable String username) {
        try {
            List<Video> videos = videoService.findVideosByUsername(username);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
