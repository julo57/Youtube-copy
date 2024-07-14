package com.youtubeclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtubeclone.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
