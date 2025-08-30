import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DailyUpdates.css";

function DailyUpdates() {
  const [message, setMessage] = useState("");
  const [updates, setUpdates] = useState([]);

  // Fetch updates on page load
  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/updates");
      setUpdates(res.data);
    } catch (err) {
      console.error("Error fetching updates", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/updates", { message });
      setMessage("");
      fetchUpdates(); // reload updates
    } catch (err) {
      console.error("Error adding update", err);
    }
  };

  return (
    <div className="updates-container">
      <h1>Daily Updates</h1>
      <form onSubmit={handleSubmit} className="update-form">
        <textarea
          placeholder="Write your update..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Post Update</button>
      </form>

      <div className="updates-list">
        {updates.map((upd) => (
          <div key={upd.id} className="update-box">
            <p>{upd.message}</p>
            <span className="timestamp">
              {new Date(upd.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyUpdates;
