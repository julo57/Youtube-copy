import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Ensure you have an AuthContext to provide user details

const VideoDetail = () => {
    const { id } = useParams();
    const { user } = useAuth(); // Get the authenticated user
    const [video, setVideo] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [subscriptionCount, setSubscriptionCount] = useState(0);
    const [userLikeStatus, setUserLikeStatus] = useState(null); // 'like', 'dislike', or null

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/videos/${id}`);
                setVideo(response.data);
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
                setComments(response.data.comments);

                // Fetch subscription count
                const subResponse = await axios.get(`http://localhost:8080/api/videos/subscriptions/count/${response.data.username}`);
                setSubscriptionCount(subResponse.data);

                // Check if the user is subscribed
                if (user) {
                    const checkSubResponse = await axios.get(`http://localhost:8080/api/videos/check-subscription`, {
                        params: { subscriber: user.username, subscribedTo: response.data.username }
                    });
                    setSubscribed(checkSubResponse.data);

                    // Fetch the user's like/dislike status for the video
                    const likeStatusResponse = await axios.get(`http://localhost:8080/api/videos/${id}/user-like-status`, {
                        params: { username: user.username }
                    });
                    setUserLikeStatus(likeStatusResponse.data.status); // 'like', 'dislike', or null
                }
            } catch (error) {
                setError('Error fetching video details.');
                console.error(error);
            }
        };
        fetchVideo();
    }, [id, user]);

    const handleLike = async () => {
        if (!user) {
            setError('You must be logged in to like.');
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/videos/${id}/like`, { username: user.username }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setLikes(likes + 1);
            if (userLikeStatus === 'dislike') {
                setDislikes(dislikes - 1);
            }
            setUserLikeStatus('like');
        } catch (error) {
            console.error('Error liking the video:', error);
        }
    };

    const handleDislike = async () => {
        if (!user) {
            setError('You must be logged in to dislike.');
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/videos/${id}/dislike`, { username: user.username }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setDislikes(dislikes + 1);
            if (userLikeStatus === 'like') {
                setLikes(likes - 1);
            }
            setUserLikeStatus('dislike');
        } catch (error) {
            console.error('Error disliking the video:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to comment.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8080/api/videos/${id}/comment`, {
                text: newComment,
                username: user.username // Include the username of the authenticated user
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding a comment:', error);
            setError('Error adding a comment. Please try again.');
        }
    };

    const handleSubscribe = async () => {
        if (!user) {
            setError('You must be logged in to subscribe.');
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/videos/subscribe`, { subscriber: user.username, subscribedTo: video.username }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const newSubscribedState = !subscribed;
            setSubscribed(newSubscribedState);
            setSubscriptionCount(newSubscribedState ? subscriptionCount + 1 : subscriptionCount - 1);
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };

    return (
        <div className="video-detail-container">
            {error && <div className="error">{error}</div>}
            {video && (
                <>
                    <h1>{video.title}</h1>
                    <video width="640" height="360" controls>
                        <source src={`http://localhost:8080${video.url}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="video-actions">
                        <button onClick={handleLike} disabled={userLikeStatus === 'like'}>Like ({likes})</button>
                        <button onClick={handleDislike} disabled={userLikeStatus === 'dislike'}>Dislike ({dislikes})</button>
                        <button onClick={handleSubscribe}>
                            {subscribed ? 'Unsubscribe' : 'Subscribe'} ({subscriptionCount})
                        </button>
                    </div>
                    <div className="comments-section">
                        <h2>Comments</h2>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <div className="comments-list">
                            {comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>{comment.text}</p>
                                    <small>by {comment.username}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoDetail;
