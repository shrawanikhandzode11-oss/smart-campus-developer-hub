import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaUsers,
  FaRocket,
  FaSearch,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import API from "../services/api";

function Projects() {
  const navigate = useNavigate();

  // ===============================
  // SEARCH
  // ===============================

  const [searchTerm, setSearchTerm] = useState("");

  // ===============================
  // PROJECTS
  // ===============================

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState("");

  // ===============================
  // CREATE PROJECT FORM
  // ===============================

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [status, setStatus] = useState("Active");

  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createMessage, setCreateMessage] = useState("");

  // ===============================
  // FETCH PROJECTS
  // ===============================

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      setProjectError("");

      const response = await API.get("/projects");

      setProjects(response.data);
    } catch (error) {
      console.error(error);

      setProjectError(
        error.response?.data?.message ||
          "Failed to load projects"
      );
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch projects when page opens
  useEffect(() => {
    fetchProjects();
  }, []);

  // ===============================
  // CREATE PROJECT
  // ===============================

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      setCreateLoading(true);
      setCreateError("");
      setCreateMessage("");

      const response = await API.post("/projects", {
        title,
        description,
        technologies,
        status,
      });

      setCreateMessage(
        response.data.message ||
          "Project created successfully!"
      );

      // Clear form
      setTitle("");
      setDescription("");
      setTechnologies("");
      setStatus("Active");

      // Refresh projects automatically
      await fetchProjects();

      // Close form after success
      setTimeout(() => {
        setShowCreateForm(false);
        setCreateMessage("");
      }, 1000);

    } catch (error) {
      console.error(error);

      setCreateError(
        error.response?.data?.message ||
          "Failed to create project"
      );
    } finally {
      setCreateLoading(false);
    }
  };

  // ===============================
  // CANCEL CREATE PROJECT
  // ===============================

  const handleCancelCreate = () => {
    setShowCreateForm(false);

    setTitle("");
    setDescription("");
    setTechnologies("");
    setStatus("Active");

    setCreateError("");
    setCreateMessage("");
  };

  // ===============================
  // SEARCH PROJECTS
  // ===============================

  const filteredProjects = projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ===============================
  // TECHNOLOGIES
  // ===============================

  const getTechnologies = (technologies) => {
    if (!technologies) {
      return [];
    }

    return technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);
  };

  // ===============================
  // PROJECT ICON
  // ===============================

  const getProjectIcon = (project) => {
    const projectTitle = project.title.toLowerCase();

    if (
      projectTitle.includes("ai") ||
      projectTitle.includes("python")
    ) {
      return <FaRocket />;
    }

    if (
      projectTitle.includes("connect") ||
      projectTitle.includes("team") ||
      projectTitle.includes("student")
    ) {
      return <FaUsers />;
    }

    return <FaCode />;
  };

  return (
    <div className="projects-page">

      {/* ===============================
          NAVBAR
      =============================== */}

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

      {/* ===============================
          PAGE HEADER
      =============================== */}

      <section className="projects-header">

        <p className="hero-tag">
          DISCOVER PROJECTS
        </p>

        <h1>
          Find projects.
          <span> Build something amazing.</span>
        </h1>

        <p>
          Explore projects created by students and find opportunities
          to collaborate, learn, and gain real-world development experience.
        </p>

      </section>

      {/* ===============================
          SEARCH
      =============================== */}

      <section className="project-search">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

      </section>

      {/* ===============================
          PROJECTS SECTION
      =============================== */}

      <section className="all-projects">

        {/* Section Header */}

        <div className="projects-title">

          <div>

            <h2>
              Available Projects
            </h2>

            <p>
              Explore projects and start collaborating.
            </p>

          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >

            {/* Project Count */}

            <span>
              {loadingProjects
                ? "Loading..."
                : `${filteredProjects.length} Projects`}
            </span>

            {/* Create Project Button */}

            <button
              className="project-btn"
              onClick={() =>
                setShowCreateForm(true)
              }
            >
              <FaPlus />

              {" "}

              Create Project

            </button>

          </div>

        </div>

        {/* ===============================
            CREATE PROJECT FORM
        =============================== */}

        {showCreateForm && (

          <div
            className="create-project-form"
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              marginBottom: "30px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)",
              maxWidth: "700px",
            }}
          >

            {/* Form Header */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >

              <h2>
                Create New Project
              </h2>

              <button
                onClick={handleCancelCreate}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <FaTimes />
              </button>

            </div>

            {/* Success Message */}

            {createMessage && (

              <p
                style={{
                  color: "green",
                  marginBottom: "15px",
                }}
              >
                {createMessage}
              </p>

            )}

            {/* Error Message */}

            {createError && (

              <p
                style={{
                  color: "red",
                  marginBottom: "15px",
                }}
              >
                {createError}
              </p>

            )}

            {/* Form */}

            <form
              onSubmit={handleCreateProject}
            >

              {/* Project Title */}

              <div
                style={{
                  marginBottom: "20px",
                }}
              >

                <label>
                  Project Title
                </label>

                <input
                  type="text"
                  placeholder="Enter project title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "8px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                  }}
                />

              </div>

              {/* Description */}

              <div
                style={{
                  marginBottom: "20px",
                }}
              >

                <label>
                  Project Description
                </label>

                <textarea
                  placeholder="Describe your project"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "8px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    resize: "vertical",
                  }}
                />

              </div>

              {/* Technologies */}

              <div
                style={{
                  marginBottom: "20px",
                }}
              >

                <label>
                  Technologies
                </label>

                <input
                  type="text"
                  placeholder="React, Node.js, PostgreSQL"
                  value={technologies}
                  onChange={(e) =>
                    setTechnologies(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "8px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                  }}
                />

              </div>

              {/* Status */}

              <div
                style={{
                  marginBottom: "25px",
                }}
              >

                <label>
                  Project Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "8px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                  }}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Open">
                    Open
                  </option>

                </select>

              </div>

              {/* Buttons */}

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                }}
              >

                <button
                  type="submit"
                  className="project-btn"
                  disabled={createLoading}
                >
                  {createLoading
                    ? "Creating..."
                    : "Create Project"}
                </button>

                <button
                  type="button"
                  onClick={
                    handleCancelCreate
                  }
                  style={{
                    border: "none",
                    padding:
                      "12px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#e2e8f0",
                  }}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        )}

        {/* ===============================
            LOADING
        =============================== */}

        {loadingProjects && (

          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              color: "#64748b",
            }}
          >
            Loading projects...
          </p>

        )}

        {/* ===============================
            ERROR
        =============================== */}

        {projectError && (

          <p
            style={{
              textAlign: "center",
              color: "red",
              marginTop: "30px",
            }}
          >
            {projectError}
          </p>

        )}

        {/* ===============================
            PROJECT GRID
        =============================== */}

        {!loadingProjects &&
          !projectError && (

            <div className="project-grid">

              {filteredProjects.map(
                (project) => (

                  <div
                    className="project-card"
                    key={project.id}
                  >

                    {/* Project Top */}

                    <div className="project-top">

                      <div className="project-icon">

                        {getProjectIcon(
                          project
                        )}

                      </div>

                      <span
                        className={`status ${
                          (
                            project.status ||
                            "Active"
                          ).toLowerCase()
                        }`}
                      >

                        {project.status ||
                          "Active"}

                      </span>

                    </div>

                    {/* Project Title */}

                    <h3>
                      {project.title}
                    </h3>

                    {/* Description */}

                    <p>
                      {project.description}
                    </p>

                    {/* Technologies */}

                    <div className="tech-tags">

                      {getTechnologies(
                        project.technologies
                      ).map(
                        (technology) => (

                          <span
                            key={technology}
                          >

                            {technology}

                          </span>

                        )
                      )}

                    </div>

                    {/* Owner */}

                    <div className="project-members">

                      <FaUsers />

                      <span>
                        Project Owner
                      </span>

                    </div>

                    {/* View Details */}

                    <button
                      className="project-btn"
                      onClick={() =>
                        navigate(
                          `/projects/${project.id}`
                        )
                      }
                    >
                      View Details →
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        {/* ===============================
            NO PROJECTS
        =============================== */}

        {!loadingProjects &&
          !projectError &&
          filteredProjects.length === 0 && (

            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                marginTop: "30px",
              }}
            >
              No projects found.
              <br />
              Create your first project! 🚀
            </p>

          )}

      </section>

    </div>
  );
}

export default Projects;