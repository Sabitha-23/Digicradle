import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Welcome to DigiCradle</h1>
      <p>Connecting your village, town, or city in one app!</p>
      <Link to="/login">
        <button className="btn">Go to Login</button>
      </Link>
    </div>
  );
}

export default Home;
