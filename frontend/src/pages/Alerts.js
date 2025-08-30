import React, { useState } from "react";
import axios from "axios";


function Alerts({ currentUser }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      await axios.post("http://localhost:5000/alerts/add", {
        username: currentUser,
        message,
      });
      setMessage("");
      alert("Alert posted successfully!");
    } catch (err) {
      console.error("Error posting alert:", err);
      alert("Failed to post alert");
    }
  };

  return (
    <div className="alerts-container">
      <h2>Post an Alert</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter alert message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Post Alert</button>
      </form>
    </div>
  );
}

export default Alerts;
