import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCode, FaUsers, FaArrowLeft } from "react-icons/fa";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tracks whether the user has joined the project
  const [joined, setJoined] = useState(false);

  const projects = [
    {
      id: "1",
      title: "Smart Campus Event Manager",
      description:
        "A platform for managing campus events and helping students discover and participate in activities.",
      technologies: ["React", "JavaScript"],
      status: "Active",
      members: 4,
      fullDescription:
        "The Smart Campus Event Manager helps students discover campus events, register for activities, and collaborate with event organizers. The platform makes campus event management easier and more organized.",
    },
    {
      id: "2",
      title: "AI Study Assistant",
      description:
        "An intelligent platform that helps students organize their studies and improve productivity.",
      technologies: ["Python", "AI"],
      status: "Active",
      members: 3,
      fullDescription:
        "The AI Study Assistant helps students organize study schedules, manage tasks, and improve learning productivity using intelligent recommendations.",
    },
    {
      id: "3",
      title: "Campus Study Connect",
      description:
        "A collaborative platform where students can find study partners and join study groups.",
      technologies: ["React", "CSS"],
      status: "Open",
      members: 2,
      fullDescription:
        "Campus Study Connect allows students to find study partners based on subjects and interests. Students can also create and join study groups.",
    },
    {
      id: "4",
      title: "Developer Portfolio Builder",
      description:
        "A platform that helps students create and showcase professional developer portfolios.",
      technologies: ["React", "JavaScript"],
      status: "Open",
      members: 2,
      fullDescription:
        "The Developer Portfolio Builder helps students create professional portfolios to showcase their projects, technical skills, and achievements.",
    },
    {
      id: "5",
      title: "Campus Navigation App",
      description:
        "A smart application that helps students find classrooms, labs, departments, and campus facilities.",
      technologies: ["JavaScript", "Maps API"],
      status: "Active",
      members: 5,
      fullDescription:
        "The Campus Navigation App helps students easily locate classrooms, laboratories, departments, and other important campus facilities.",
    },
    {
      id: "6",
      title: "Student Skill Exchange",
      description:
        "A platform where students can teach skills, learn from peers, and collaborate on projects.",
      technologies: ["React", "Node.js"],
      status: "Open",
      members: 3,
      fullDescription:
        "Student Skill Exchange allows students to share their skills with others and learn new skills through peer-to-peer collaboration.",
    },
  ];

  const project = projects.find(
    (project) => project.id === id
  );

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project Not Found</h2>

        <button onClick={() => navigate("/projects")}>
          Back to Projects
        </button>
      </div>
    );
  }

  // Join Project functionality
  const handleJoinProject = () => {
    setJoined(true);
  };

  return (
    <div className="project-details-page">

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

          <button
            className="active-nav"
            onClick={() => navigate("/projects")}
          >
            Projects
          </button>

          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <section className="project-details">

        {/* Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate("/projects")}
        >
          <FaArrowLeft />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="details-header">

          <div className="details-icon">
            <FaCode />
          </div>

          <div>
            <span
              className={`status ${project.status.toLowerCase()}`}
            >
              {project.status}
            </span>

            <h1>{project.title}</h1>

            <p>{project.description}</p>
          </div>

        </div>

        {/* Details Grid */}
        <div className="details-grid">

          {/* Main Information */}
          <div className="details-main">

            <div className="details-card">
              <h2>About This Project</h2>

              <p>{project.fullDescription}</p>
            </div>

            <div className="details-card">
              <h2>Technologies</h2>

              <div className="tech-tags">
                {project.technologies.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="details-sidebar">

            <div className="details-card">

              <h2>Project Team</h2>

              <div className="team-info">
                <FaUsers />

                <span>
                  {project.members + (joined ? 1 : 0)} Team Members
                </span>
              </div>

              <button
                className="join-btn"
                onClick={handleJoinProject}
                disabled={joined}
              >
                {joined ? "✓ Joined Project" : "Join Project"}
              </button>

              {joined && (
                <p
                  style={{
                    color: "#16a34a",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  You have successfully joined this project!
                </p>
              )}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default ProjectDetails;