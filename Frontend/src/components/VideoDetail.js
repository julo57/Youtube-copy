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

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/videos/${id}`);
                setVideo(response.data);
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
                setComments(response.data.comments);
            } catch (error) {
                setError('Error fetching video details.');
                console.error(error);
            }
        };
        fetchVideo();
    }, [id]);

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:8080/api/videos/${id}/like`);
            setLikes(likes + 1);
        } catch (error) {
            console.error('Error liking the video:', error);
        }
    };

    const handleDislike = async () => {
        try {
            await axios.post(`http://localhost:8080/api/videos/${id}/dislike`);
            setDislikes(dislikes + 1);
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
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding a comment:', error);
            setError('Error adding a comment. Please try again.');
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
                        <button onClick={handleLike}>Like ({likes})</button>
                        <button onClick={handleDislike}>Dislike ({dislikes})</button>
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
