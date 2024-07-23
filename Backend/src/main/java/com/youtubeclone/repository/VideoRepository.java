package com.youtubeclone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.youtubeclone.model.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByUsername(String username);
}
