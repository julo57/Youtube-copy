package com.youtubeclone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtubeclone.model.WatchedVideo;

public interface WatchedVideoRepository extends JpaRepository<WatchedVideo, Long> {
    List<WatchedVideo> findByUsername(String username);
}
