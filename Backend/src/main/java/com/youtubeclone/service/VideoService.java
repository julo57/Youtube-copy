package com.youtubeclone.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.youtubeclone.exception.ResourceNotFoundException;
import com.youtubeclone.model.Comment;
import com.youtubeclone.model.Video;
import com.youtubeclone.repository.CommentRepository;
import com.youtubeclone.repository.VideoRepository;

@Service
public class VideoService {

    private final Path fileStorageLocation;
    private final VideoRepository videoRepository;
    private final CommentRepository commentRepository;

    public VideoService(@Value("${file.upload-dir}") String uploadDir, VideoRepository videoRepository, CommentRepository commentRepository) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.videoRepository = videoRepository;
        this.commentRepository = commentRepository;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    /**
     * Saves a video to the file system and metadata to the database.
     */
    public void saveVideo(MultipartFile videoFile, String title, String description, String username) throws IOException {
        String fileName = StringUtils.cleanPath(videoFile.getOriginalFilename());

        // Copy file to the target location (Replacing existing file with the same name)
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        Files.copy(videoFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Save video metadata to the database
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setUsername(username);
        video.setUrl("/uploads/" + fileName); // URL to access the video
        videoRepository.save(video);
    }

    /**
     * Retrieves all videos.
     */
    public List<Video> findAll() {
        return videoRepository.findAll();
    }

    /**
     * Finds a video by its ID.
     */
    public Video findById(Long id) {
        return videoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
    }

    /**
     * Increments the like count for a video.
     */
    public void likeVideo(Long id) {
        Video video = videoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
        video.setLikes(video.getLikes() + 1);
        videoRepository.save(video);
    }

    /**
     * Increments the dislike count for a video.
     */
    public void dislikeVideo(Long id) {
        Video video = videoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
        video.setDislikes(video.getDislikes() + 1);
        videoRepository.save(video);
    }

    /**
     * Adds a comment to a video.
     */
    public Comment addComment(Long videoId, Comment comment) {
        Video video = videoRepository.findById(videoId).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
        comment.setVideo(video);
        return commentRepository.save(comment);
    }
}
