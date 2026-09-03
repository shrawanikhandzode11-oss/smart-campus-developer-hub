import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaUsers, FaRocket, FaSearch } from "react-icons/fa";

function Projects() {
  const navigate = useNavigate();

  // Stores whatever the user types in the search box
  const [searchTerm, setSearchTerm] = useState("");

  const projects = [
    {
      id: 1,
      title: "Smart Campus Event Manager",
      description:
        "A platform for managing campus events and helping students discover and participate in activities.",
      technologies: ["React", "JavaScript"],
      status: "Active",
      members: 4,
      icon: <FaCode />,
    },
    {
      id: 2,
      title: "AI Study Assistant",
      description:
        "An intelligent platform that helps students organize their studies and improve productivity.",
      technologies: ["Python", "AI"],
      status: "Active",
      members: 3,
      icon: <FaRocket />,
    },
    {
      id: 3,
      title: "Campus Study Connect",
      description:
        "A collaborative platform where students can find study partners and join study groups.",
      technologies: ["React", "CSS"],
      status: "Open",
      members: 2,
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "Developer Portfolio Builder",
      description:
        "A platform that helps students create and showcase professional developer portfolios.",
      technologies: ["React", "JavaScript"],
      status: "Open",
      members: 2,
      icon: <FaCode />,
    },
    {
      id: 5,
      title: "Campus Navigation App",
      description:
        "A smart application that helps students find classrooms, labs, departments, and campus facilities.",
      technologies: ["JavaScript", "Maps API"],
      status: "Active",
      members: 5,
      icon: <FaRocket />,
    },
    {
      id: 6,
      title: "Student Skill Exchange",
      description:
        "A platform where students can teach skills, learn from peers, and collaborate on projects.",
      technologies: ["React", "Node.js"],
      status: "Open",
      members: 3,
      icon: <FaUsers />,
    },
  ];

  // Filters projects based on the search input
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-page">

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

          <button className="active-nav">
            Projects
          </button>

          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>
      </nav>

      {/* Page Header */}
      <section className="projects-header">
        <p className="hero-tag">DISCOVER PROJECTS</p>

        <h1>
          Find projects.
          <span> Build something amazing.</span>
        </h1>

        <p>
          Explore projects created by students and find opportunities
          to collaborate, learn, and gain real-world development experience.
        </p>
      </section>

      {/* Search Section */}
      <section className="project-search">
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="all-projects">

        <div className="projects-title">
          <div>
            <h2>Available Projects</h2>
            <p>Explore projects and start collaborating.</p>
          </div>

          <span>{filteredProjects.length} Projects</span>
        </div>

        <div className="project-grid">

          {filteredProjects.map((project) => (

            <div className="project-card" key={project.id}>

              <div className="project-top">

                <div className="project-icon">
                  {project.icon}
                </div>

                <span
                  className={`status ${project.status.toLowerCase()}`}
                >
                  {project.status}
                </span>

              </div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-tags">

                {project.technologies.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}

              </div>

              <div className="project-members">
                <FaUsers />
                <span>{project.members} Team Members</span>
              </div>

              <button
                className="project-btn"
                onClick={() =>
                  navigate(`/projects/${project.id}`)
                }
              >
                View Details →
              </button>

            </div>

          ))}

        </div>

        {/* No Projects Found Message */}
        {filteredProjects.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              marginTop: "30px",
            }}
          >
            No projects found.
          </p>
        )}

      </section>

    </div>
  );
}

export default Projects;