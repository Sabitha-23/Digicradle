import React, { useState } from "react";
import "./Business.css";

function Business({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const handlePost = () => {
    if (message.trim() === "") return;

    const newPost = {
      id: Date.now(), // unique ID
      user: currentUser || "Anonymous",
      text: message,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    setPosts([newPost, ...posts]);
    setMessage("");
  };

  const handleDelete = (id, user) => {
    if (user !== currentUser) {
      alert("You can only delete your own posts!");
      return;
    }
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="business-page">
      <h2>Business Posts</h2>

      {/* Post Box */}
      <div className="post-box">
        <textarea
          placeholder="Post a job or requirement..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>

      {/* Show Posts */}
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <strong>{post.user}</strong>
              </div>
              <p>{post.text}</p>
              <div className="post-footer">
                <small>{post.date} {post.time}</small>
                {post.user === currentUser && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post.id, post.user)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Business;
