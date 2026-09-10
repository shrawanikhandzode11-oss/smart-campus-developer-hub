import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaProjectDiagram,
  FaUsers,
  FaRocket,
  FaSync,
  FaEdit,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ===============================
  // USERS
  // ===============================

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userError, setUserError] = useState("");

  // ===============================
  // PROJECTS
  // ===============================

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectError, setProjectError] = useState("");

  // ===============================
  // LOGGED-IN USER
  // ===============================

  const [loggedInUser, setLoggedInUser] = useState(null);

  // ===============================
  // EDIT USER
  // ===============================

  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [editError, setEditError] = useState("");

  // ===============================
  // DELETE USER
  // ===============================

  const [deletingUserId, setDeletingUserId] = useState(null);

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ===============================
  // GET LOGGED-IN USER
  // ===============================

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  // ===============================
  // FETCH USERS
  // ===============================

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setUserError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await API.get("/users");

      setUsers(response.data);
    } catch (error) {
      console.error(error);

      setUserError(
        error.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  // ===============================
  // FETCH PROJECTS
  // ===============================

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      setProjectError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

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

  // ===============================
  // FETCH DATA WHEN DASHBOARD OPENS
  // ===============================

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  // ===============================
  // OPEN EDIT USER FORM
  // ===============================

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);

    setEditMessage("");
    setEditError("");
  };

  // ===============================
  // CANCEL EDITING
  // ===============================

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditName("");
    setEditEmail("");
    setEditMessage("");
    setEditError("");
  };

  // ===============================
  // UPDATE USER
  // ===============================

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      setEditLoading(true);
      setEditMessage("");
      setEditError("");

      const response = await API.put(
        `/users/${editingUser.id}`,
        {
          name: editName,
          email: editEmail,
        }
      );

      setEditMessage("User updated successfully!");

      // Update logged-in user data if they edited themselves
      if (loggedInUser?.id === editingUser.id) {
        const updatedLoggedInUser = {
          ...loggedInUser,
          name: response.data.name,
          email: response.data.email,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedLoggedInUser)
        );

        setLoggedInUser(updatedLoggedInUser);
      }

      // Refresh users
      await fetchUsers();

      // Close form after success
      setTimeout(() => {
        handleCancelEdit();
      }, 1000);

    } catch (error) {
      setEditError(
        error.response?.data?.message ||
          "Failed to update user"
      );
    } finally {
      setEditLoading(false);
    }
  };

  // ===============================
  // DELETE USER
  // ===============================

  const handleDeleteUser = async (user) => {
    // Prevent deleting currently logged-in user
    if (loggedInUser?.id === user.id) {
      alert(
        "You cannot delete the account you are currently logged into."
      );
      return;
    }

    // Confirmation popup
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingUserId(user.id);

      await API.delete(`/users/${user.id}`);

      // Close edit form if deleted user was being edited
      if (editingUser?.id === user.id) {
        handleCancelEdit();
      }

      // Refresh users
      await fetchUsers();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    } finally {
      setDeletingUserId(null);
    }
  };

  // ===============================
  // FORMAT REGISTRATION DATE
  // ===============================

  const formatJoinedDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ===============================
  // GET PROJECT ICON
  // ===============================

  const getProjectIcon = (project) => {
    const projectTitle = project.title?.toLowerCase() || "";

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

  // ===============================
  // RETURN
  // ===============================

  return (
    <div className="dashboard-page">

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

          <button onClick={() => navigate("/projects")}>
            Projects
          </button>

          <button className="active-nav">
            Dashboard
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </nav>

      {/* ===============================
          DASHBOARD HEADER
      =============================== */}

      <section className="dashboard-header">

        <p className="hero-tag">
          STUDENT DASHBOARD
        </p>

        <h1>
          Welcome back,
          <span>
            {" "}
            {loggedInUser?.name || "Developer"}!
          </span>
        </h1>

        <p>
          Track your projects, collaborations, and development journey.
        </p>

      </section>

      {/* ===============================
          DASHBOARD STATISTICS
      =============================== */}

      <section className="dashboard-stats">

        {/* My Projects */}

        <div className="stat-card">

          <div className="stat-icon">
            <FaProjectDiagram />
          </div>

          <div>

            <p>My Projects</p>

            <h2>
              {loadingProjects
                ? "..."
                : projects.length}
            </h2>

          </div>

        </div>

        {/* Registered Users */}

        <div className="stat-card">

          <div className="stat-icon">
            <FaUsers />
          </div>

          <div>

            <p>Registered Users</p>

            <h2>
              {loadingUsers
                ? "..."
                : users.length}
            </h2>

          </div>

        </div>

        {/* Skills Growing */}

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

      {/* ===============================
          MY RECENT PROJECTS
      =============================== */}

      <section className="dashboard-content">

        <div className="dashboard-section-header">

          <div>

            <h2>
              My Recent Projects
            </h2>

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

        {/* Loading Projects */}

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

        {/* Project Error */}

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

        {/* Dynamic Projects */}

        {!loadingProjects &&
          !projectError && (

            <div className="dashboard-projects">

              {projects.length === 0 ? (

                <p>
                  No projects created yet.
                </p>

              ) : (

                projects.map((project) => (

                  <div
                    className="dashboard-project-card"
                    key={project.id}
                  >

                    {/* Project Icon */}

                    <div className="dashboard-project-icon">

                      {getProjectIcon(project)}

                    </div>

                    {/* Project Details */}

                    <div>

                      <h3>
                        {project.title}
                      </h3>

                      <p>
                        {project.technologies ||
                          "No technologies added"}
                      </p>

                      <span
                        className={`dashboard-status ${
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

                  </div>

                ))

              )}

            </div>

          )}

      </section>

      {/* ===============================
          CONNECTED USERS
      =============================== */}

      <section className="dashboard-content">

        <div className="dashboard-section-header">

          <div>

            <h2>
              Connected Users
            </h2>

            <p>
              Users fetched directly from the backend database.
            </p>

          </div>

          {/* Refresh Users */}

          <button
            className="view-projects-btn"
            onClick={fetchUsers}
            disabled={loadingUsers}
          >

            <FaSync />

            {" "}

            {loadingUsers
              ? "Refreshing..."
              : "Refresh Users"}

          </button>

        </div>

        {/* ===============================
            EDIT USER FORM
        =============================== */}

        {editingUser && (

          <div className="edit-user-form">

            <div className="edit-form-header">

              <h2>
                Edit User
              </h2>

              <button
                className="cancel-edit-btn"
                onClick={handleCancelEdit}
              >
                <FaTimes />
              </button>

            </div>

            {/* Success Message */}

            {editMessage && (

              <p className="success-message">
                {editMessage}
              </p>

            )}

            {/* Error Message */}

            {editError && (

              <p className="error-message">
                {editError}
              </p>

            )}

            {/* Edit Form */}

            <form onSubmit={handleUpdateUser}>

              {/* Name */}

              <div className="input-group">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  required
                />

              </div>

              {/* Email */}

              <div className="input-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) =>
                    setEditEmail(e.target.value)
                  }
                  required
                />

              </div>

              {/* Edit Buttons */}

              <div className="edit-buttons">

                <button
                  type="submit"
                  className="login-button"
                  disabled={editLoading}
                >
                  {editLoading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        )}

        {/* ===============================
            LOADING USERS
        =============================== */}

        {loadingUsers && (

          <p>
            Loading users...
          </p>

        )}

        {/* ===============================
            USER ERROR
        =============================== */}

        {userError && (

          <p style={{ color: "red" }}>
            {userError}
          </p>

        )}

        {/* ===============================
            USERS LIST
        =============================== */}

        {!loadingUsers &&
          !userError && (

            <div className="dashboard-projects">

              {users.length === 0 ? (

                <p>
                  No users found.
                </p>

              ) : (

                users.map((user) => (

                  <div
                    className="dashboard-project-card"
                    key={user.id}
                  >

                    {/* User Icon */}

                    <div className="dashboard-project-icon">

                      <FaUsers />

                    </div>

                    {/* User Details */}

                    <div>

                      <h3>
                        {user.name}
                      </h3>

                      <p>
                        {user.email}
                      </p>

                      <p>
                        Joined:{" "}
                        {formatJoinedDate(
                          user.created_at
                        )}
                      </p>

                      <span className="dashboard-status active">
                        Connected
                      </span>

                      {/* Edit User */}

                      <button
                        className="view-projects-btn"
                        onClick={() =>
                          handleEditClick(user)
                        }
                        style={{
                          marginTop: "15px",
                          marginRight: "10px",
                        }}
                        disabled={
                          deletingUserId === user.id
                        }
                      >

                        <FaEdit />

                        {" "}

                        Edit User

                      </button>

                      {/* Delete User */}

                      <button
                        className="delete-user-btn"
                        onClick={() =>
                          handleDeleteUser(user)
                        }
                        disabled={
                          deletingUserId === user.id
                        }
                      >

                        <FaTrash />

                        {" "}

                        {deletingUserId === user.id
                          ? "Deleting..."
                          : "Delete User"}

                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          )}

      </section>

    </div>
  );
}

export default Dashboard;