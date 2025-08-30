import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AlertTicker.css"; // ✅ new CSS file

function AlertTicker() {
  const [alerts, setAlerts] = useState([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  return (
    <div className="alert-bar">
      <div className={`alert-track ${paused ? "paused" : ""}`}>
        {alerts.map((a) => (
          <span key={a.id} className="alert-message">
            🔔 {a.message} &nbsp;({new Date(a.created_at).toLocaleString()})
          </span>
        ))}
      </div>
      <button className="alert-btn" onClick={() => setPaused(!paused)}>
        {paused ? "Start" : "Stop"}
      </button>
    </div>
  );
}

export default AlertTicker;
