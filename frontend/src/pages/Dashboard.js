import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [activeModule, setActiveModule] = useState("home");
  const [updates, setUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAddUpdate = () => {
    if (newUpdate.trim() === "") return;
    setUpdates([...updates, { text: newUpdate, date: new Date().toLocaleString() }]);
    setNewUpdate("");
  };

  const renderModule = () => {
    switch (activeModule) {
      case "updates":
        return (
          <div className="updates-module">
            <h2>📝 Daily Updates</h2>
            <div className="update-form">
              <textarea
                placeholder="Write your update..."
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
              ></textarea>
              <button onClick={handleAddUpdate}>Add Update</button>
            </div>
            <div className="updates-list">
              {updates.length === 0 ? (
                <p>No updates yet.</p>
              ) : (
                updates.map((u, index) => (
                  <div key={index} className="update-card">
                    <p>{u.text}</p>
                    <small>{u.date}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      case "reports":
        return <h2>📊 Reports Module</h2>;
      case "files":
        return <h2>📁 Files Module</h2>;
      case "settings":
        return <h2>⚙️ Settings Module</h2>;
      case "contact":
        return <h2>📞 Contact Module</h2>;
      default:
        return <h2>🎉 Welcome to your Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="app-title">My App</h1>

        {/* Three-dot menu */}
        <div className="menu-container">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ⋮
          </button>
          {menuOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => { setActiveModule("updates"); setMenuOpen(false); }}>📝 Daily Updates</li>
              <li onClick={() => { setActiveModule("reports"); setMenuOpen(false); }}>📊 Reports</li>
              <li onClick={() => { setActiveModule("files"); setMenuOpen(false); }}>📁 Files</li>
              <li onClick={() => { setActiveModule("settings"); setMenuOpen(false); }}>⚙️ Settings</li>
              <li onClick={() => { setActiveModule("contact"); setMenuOpen(false); }}>📞 Contact</li>
            </ul>
          )}
        </div>

        <button className="logout-btn">Logout</button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderModule()}
      </main>
    </div>
  );
}

export default Dashboard;
