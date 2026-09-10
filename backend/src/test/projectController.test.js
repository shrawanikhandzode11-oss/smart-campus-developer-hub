const { describe, test, expect, beforeEach } = require("@jest/globals");

// Mock the database connection
jest.mock("../db", () => ({
  query: jest.fn(),
}));

const pool = require("../db");

const {
  createProject,
  getMyProjects,
} = require("../controllers/projectController");

describe("Project Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a project successfully", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          title: "Test Project",
          description: "Test project description",
          technologies: "React, Node.js",
          status: "Active",
          user_id: 1,
        },
      ],
    });

    const req = {
      body: {
        title: "Test Project",
        description: "Test project description",
        technologies: "React, Node.js",
        status: "Active",
      },
      user: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createProject(req, res);

    expect(pool.query).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      message: "Project created successfully",
      project: expect.objectContaining({
        title: "Test Project",
      }),
    });
  });

  test("should reject project when title or description is missing", async () => {
    const req = {
      body: {
        title: "",
        description: "",
      },
      user: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createProject(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Project title and description are required",
    });

    expect(pool.query).not.toHaveBeenCalled();
  });

  test("should fetch projects for the logged-in user", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          title: "Campus Study Assistant",
          description: "Study collaboration platform.",
          technologies: "React, Node.js",
          status: "Active",
          user_id: 1,
        },
        {
          id: 2,
          title: "AI Study Planner",
          description: "AI based study planner.",
          technologies: "Python, React",
          status: "Active",
          user_id: 1,
        },
      ],
    });

    const req = {
      user: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getMyProjects(req, res);

    expect(pool.query).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Campus Study Assistant",
        }),
        expect.objectContaining({
          title: "AI Study Planner",
        }),
      ])
    );
  });
});