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

import com.youtubeclone.model.Video;
import com.youtubeclone.repository.VideoRepository;

@Service
public class VideoService {

    private final Path fileStorageLocation;
    private final VideoRepository videoRepository;

    public VideoService(@Value("${file.upload-dir}") String uploadDir, VideoRepository videoRepository) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.videoRepository = videoRepository;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

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

    public List<Video> findAll() {
        return videoRepository.findAll();
    }

    public Video findById(Long id) {
        return videoRepository.findById(id).orElseThrow(() -> new RuntimeException("Video not found"));
    }
}
