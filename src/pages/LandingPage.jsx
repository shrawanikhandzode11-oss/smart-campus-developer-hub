import { useNavigate } from "react-router-dom";
import { FaCode, FaUsers, FaRocket } from "react-icons/fa";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <FaCode />
          <span>CampusDevHub</span>
        </div>

        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/projects")}>Projects</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <p className="hero-tag">SMART CAMPUS DEVELOPER HUB</p>

          <h1>
            Build. Collaborate.
            <span> Grow Together.</span>
          </h1>

          <p className="hero-description">
            A collaborative platform where students can discover projects,
            connect with peers, share ideas, and improve their development
            skills through real-world collaboration.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Explore Dashboard →
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/projects")}
            >
              Browse Projects
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="code-window">

            <div className="code-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <pre>
{`const campus = {
  students: "Collaborate",
  projects: "Build",
  skills: "Grow"
};

connect();
create();
innovate();`}
            </pre>

          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="features">

        <div className="section-heading">
          <p>WHY CAMPUS DEV HUB?</p>
          <h2>Everything developers need to grow</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <FaCode />
            </div>

            <h3>Discover Projects</h3>

            <p>
              Explore student projects and discover exciting opportunities
              to contribute and learn.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>

            <h3>Collaborate</h3>

            <p>
              Connect with students who have similar interests and build
              projects together.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaRocket />
            </div>

            <h3>Grow Skills</h3>

            <p>
              Gain practical experience, receive feedback, and improve
              your development skills.
            </p>
          </div>

        </div>

      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects">

        <div className="section-heading">
          <p>FEATURED PROJECTS</p>
          <h2>Explore what students are building</h2>
        </div>

        <div className="project-grid">

          {/* Project 1 */}
          <div className="project-card">

            <div className="project-top">
              <div className="project-icon">
                <FaCode />
              </div>

              <span className="status active">
                Active
              </span>
            </div>

            <h3>Smart Campus Event Manager</h3>

            <p>
              A platform for managing campus events and helping students
              discover and participate in activities.
            </p>

            <div className="tech-tags">
              <span>React</span>
              <span>JavaScript</span>
            </div>

            <button
              className="project-btn"
              onClick={() => navigate("/projects")}
            >
              View Project →
            </button>

          </div>

          {/* Project 2 */}
          <div className="project-card">

            <div className="project-top">
              <div className="project-icon">
                <FaRocket />
              </div>

              <span className="status active">
                Active
              </span>
            </div>

            <h3>AI Study Assistant</h3>

            <p>
              An intelligent study platform that helps students learn,
              organize notes, and improve productivity.
            </p>

            <div className="tech-tags">
              <span>Python</span>
              <span>AI</span>
            </div>

            <button
              className="project-btn"
              onClick={() => navigate("/projects")}
            >
              View Project →
            </button>

          </div>

          {/* Project 3 */}
          <div className="project-card">

            <div className="project-top">
              <div className="project-icon">
                <FaUsers />
              </div>

              <span className="status open">
                Open
              </span>
            </div>

            <h3>Campus Study Connect</h3>

            <p>
              A collaborative platform where students can find study
              partners and join study groups.
            </p>

            <div className="tech-tags">
              <span>React</span>
              <span>CSS</span>
            </div>

            <button
              className="project-btn"
              onClick={() => navigate("/projects")}
            >
              View Project →
            </button>

          </div>

        </div>

        <div className="view-projects">
          <button
            className="primary-btn"
            onClick={() => navigate("/projects")}
          >
            View All Projects →
          </button>
        </div>

      </section>

    </div>
  );
}

export default LandingPage;