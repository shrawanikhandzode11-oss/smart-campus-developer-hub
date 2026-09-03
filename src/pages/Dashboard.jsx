import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaProjectDiagram,
  FaUsers,
  FaRocket,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          <FaCode />
          <span>CampusDevHub</span>
        </div>

        <div className="nav-links">
          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/projects")}>
            Projects
          </button>

          <button className="active-nav">
            Dashboard
          </button>
        </div>

      </nav>

      {/* Dashboard Header */}
      <section className="dashboard-header">

        <p className="hero-tag">
          STUDENT DASHBOARD
        </p>

        <h1>
          Welcome back,
          <span> Developer!</span>
        </h1>

        <p>
          Track your projects, collaborations, and development journey.
        </p>

      </section>

      {/* Dashboard Stats */}
      <section className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            <FaProjectDiagram />
          </div>

          <div>
            <p>My Projects</p>
            <h2>3</h2>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaUsers />
          </div>

          <div>
            <p>Collaborations</p>
            <h2>5</h2>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaRocket />
          </div>

          <div>
            <p>Skills Growing</p>
            <h2>8</h2>
          </div>

        </div>

      </section>

      {/* Recent Projects */}
      <section className="dashboard-content">

        <div className="dashboard-section-header">

          <div>
            <h2>My Recent Projects</h2>

            <p>
              Continue working on your active projects.
            </p>
          </div>

          <button
            className="view-projects-btn"
            onClick={() => navigate("/projects")}
          >
            View All Projects →
          </button>

        </div>

        <div className="dashboard-projects">

          <div className="dashboard-project-card">

            <div className="dashboard-project-icon">
              <FaCode />
            </div>

            <div>

              <h3>
                Smart Campus Event Manager
              </h3>

              <p>
                React • JavaScript
              </p>

              <span className="dashboard-status active">
                Active
              </span>

            </div>

          </div>

          <div className="dashboard-project-card">

            <div className="dashboard-project-icon">
              <FaRocket />
            </div>

            <div>

              <h3>
                AI Study Assistant
              </h3>

              <p>
                Python • AI
              </p>

              <span className="dashboard-status active">
                Active
              </span>

            </div>

          </div>

          <div className="dashboard-project-card">

            <div className="dashboard-project-icon">
              <FaUsers />
            </div>

            <div>

              <h3>
                Campus Study Connect
              </h3>

              <p>
                React • CSS
              </p>

              <span className="dashboard-status open">
                Open
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;