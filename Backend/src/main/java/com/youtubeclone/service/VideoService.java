package com.youtubeclone.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.youtubeclone.exception.ResourceNotFoundException;
import com.youtubeclone.model.Comment;
import com.youtubeclone.model.Subscription;
import com.youtubeclone.model.UserLikes;
import com.youtubeclone.model.Video;
import com.youtubeclone.repository.CommentRepository;
import com.youtubeclone.repository.SubscriptionRepository;
import com.youtubeclone.repository.UserLikesRepository;
import com.youtubeclone.repository.VideoRepository;

@Service
public class VideoService {

    private final Path fileStorageLocation;
    private final VideoRepository videoRepository;
    private final CommentRepository commentRepository;
    private final UserLikesRepository userLikesRepository;
    private final SubscriptionRepository subscriptionRepository;

    public VideoService(@Value("${file.upload-dir}") String uploadDir, VideoRepository videoRepository,
                        CommentRepository commentRepository, UserLikesRepository userLikesRepository,
                        SubscriptionRepository subscriptionRepository) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.videoRepository = videoRepository;
        this.commentRepository = commentRepository;
        this.userLikesRepository = userLikesRepository;
        this.subscriptionRepository = subscriptionRepository;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public void saveVideo(MultipartFile videoFile, String title, String description, String username) throws IOException {
        String fileName = StringUtils.cleanPath(videoFile.getOriginalFilename());

        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        Files.copy(videoFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setUsername(username);
        video.setUrl("/uploads/" + fileName);
        videoRepository.save(video);
    }

    public List<Video> findAll() {
        return videoRepository.findAll();
    }

    public Video findById(Long id) {
        return videoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
    }

    public void likeVideo(Long id, String username) {
        Video video = videoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
        Optional<UserLikes> userLikesOpt = userLikesRepository.findByUsernameAndVideoId(username, id);

        if (userLikesOpt.isPresent()) {
            UserLikes userLikes = userLikesOpt.get();
            if (!userLikes.isLiked()) {
                userLikes.setLiked(true);
                if (userLikes.isDisliked()) {
                    userLikes.setDisliked(false);
                    video.setDislikes(video.getDislikes() - 1);
                }
                video.setLikes(video.getLikes() + 1);
            }
        } else {
            UserLikes userLikes = new UserLikes();
            userLikes.setUsername(username);
            userLikes.setLiked(true);
            userLikes.setVideo(video);
            video.setLikes(video.getLikes() + 1);
            userLikesRepository.save(userLikes);
        }

        videoRepository.save(video);
    }

    public void dislikeVideo(Long id, String username) {
        Video video = videoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
        Optional<UserLikes> userLikesOpt = userLikesRepository.findByUsernameAndVideoId(username, id);

        if (userLikesOpt.isPresent()) {
            UserLikes userLikes = userLikesOpt.get();
            if (!userLikes.isDisliked()) {
                userLikes.setDisliked(true);
                if (userLikes.isLiked()) {
                    userLikes.setLiked(false);
                    video.setLikes(video.getLikes() - 1);
                }
                video.setDislikes(video.getDislikes() + 1);
            }
        } else {
            UserLikes userLikes = new UserLikes();
            userLikes.setUsername(username);
            userLikes.setDisliked(true);
            userLikes.setVideo(video);
            video.setDislikes(video.getDislikes() + 1);
            userLikesRepository.save(userLikes);
        }

        videoRepository.save(video);
    }

    public Comment addComment(Long videoId, Comment comment) {
        Video video = videoRepository.findById(videoId).orElseThrow(() -> new ResourceNotFoundException("Video not found"));
        comment.setVideo(video);
        return commentRepository.save(comment);
    }

    public void subscribeUser(String subscriber, String subscribedTo) {
        Optional<Subscription> existingSubscription = subscriptionRepository.findBySubscriberAndSubscribedTo(subscriber, subscribedTo);
        if (existingSubscription.isPresent()) {
            throw new RuntimeException("Already subscribed");
        }
        Subscription subscription = new Subscription();
        subscription.setSubscriber(subscriber);
        subscription.setSubscribedTo(subscribedTo);
        subscriptionRepository.save(subscription);
    }
}
