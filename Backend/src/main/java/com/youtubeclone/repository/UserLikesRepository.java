package com.youtubeclone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtubeclone.model.UserLikes;

public interface UserLikesRepository extends JpaRepository<UserLikes, Long> {
    Optional<UserLikes> findByUsernameAndVideoId(String username, Long videoId);
}

package com.youtubeclone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtubeclone.model.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findBySubscriberAndSubscribedTo(String subscriber, String subscribedTo);
}
