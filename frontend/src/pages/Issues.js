import React, { useState, useEffect } from "react";
import axios from "axios";


function Issues({ currentUser }) {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const res = await axios.get("http://localhost:5000/issues");
    setIssues(res.data);
  };

  const handlePost = async () => {
    if (!currentUser) {
      alert("You must be logged in to post an issue.");
      return;
    }
    await axios.post("http://localhost:5000/issues", {
      title,
      description,
      department,
      username: currentUser,
    });
    setTitle("");
    setDescription("");
    setDepartment("");
    fetchIssues();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/issues/${id}`, {
      data: { username: currentUser },
    });
    fetchIssues();
  };

  return (
    <div className="issues-container">
      <h2>Report an Issue</h2>
      <div className="issues-form">
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="Municipality">Municipality</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Police">Police</option>
        </select>
        <button onClick={handlePost}>Post Issue</button>
      </div>

      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <h4>{issue.title}</h4>
            <p>{issue.description}</p>
            <p><strong>Department:</strong> {issue.department}</p>
            <div className="issue-meta">
              Posted by {issue.username} on{" "}
              {new Date(issue.created_at).toLocaleString()}
            </div>
            {currentUser === issue.username && (
              <button onClick={() => handleDelete(issue.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Issues;
