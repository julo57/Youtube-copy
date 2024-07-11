package com.youtubeclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtubeclone.model.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
