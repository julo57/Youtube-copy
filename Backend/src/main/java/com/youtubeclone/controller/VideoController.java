package com.youtubeclone.controller;

import com.youtubeclone.model.Video;
import com.youtubeclone.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<Video>> getAllVideos() {
        List<Video> videos = videoService.findAll();
        return ResponseEntity.ok(videos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable Long id) {
        Video video = videoService.findById(id);
        return ResponseEntity.ok(video);
    }
}
