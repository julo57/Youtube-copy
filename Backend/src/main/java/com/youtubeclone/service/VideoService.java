package com.youtubeclone.service;

import com.youtubeclone.model.Video;
import com.youtubeclone.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video save(Video video) {
        return videoRepository.save(video);
    }

    public List<Video> findAll() {
        return videoRepository.findAll();
    }

    public Video findById(Long id) {
        return videoRepository.findById(id).orElse(null);
    }
}
