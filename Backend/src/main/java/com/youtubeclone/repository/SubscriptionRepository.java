package com.youtubeclone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.youtubeclone.model.Subscription;
import com.youtubeclone.model.User;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findBySubscriberAndSubscribedTo(User subscriber, User subscribedTo);
    long countBySubscribedTo(User subscribedTo);
}
