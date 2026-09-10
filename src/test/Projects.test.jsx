import { describe, test, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Projects from "../pages/Projects";
import API from "../services/api";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("Projects Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch and display projects", async () => {
    API.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Campus Study Assistant",
          description:
            "A platform that helps students organize their studies.",
          technologies: "React, Node.js, PostgreSQL",
          status: "Active",
        },
        {
          id: 2,
          title: "AI Study Planner",
          description:
            "An intelligent study planner for students.",
          technologies:
            "React, Node.js, PostgreSQL, Python",
          status: "Active",
        },
      ],
    });

    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Campus Study Assistant")
      ).toBeInTheDocument();

      expect(
        screen.getByText("AI Study Planner")
      ).toBeInTheDocument();
    });

    expect(API.get).toHaveBeenCalledWith("/projects");
  });

  test("should filter projects using search", async () => {
    API.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Campus Study Assistant",
          description: "Study collaboration platform.",
          technologies: "React, Node.js",
          status: "Active",
        },
        {
          id: 2,
          title: "AI Study Planner",
          description: "AI based study planner.",
          technologies: "Python, React",
          status: "Active",
        },
      ],
    });

    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Campus Study Assistant")
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(
      "Search projects..."
    );

    fireEvent.change(searchInput, {
      target: {
        value: "AI",
      },
    });

    expect(
      screen.getByText("AI Study Planner")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Campus Study Assistant")
    ).not.toBeInTheDocument();
  });

  test("should create a new project", async () => {
    API.get.mockResolvedValue({
      data: [],
    });

    API.post.mockResolvedValue({
      data: {
        message: "Project created successfully",
      },
    });

    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Available Projects")
      ).toBeInTheDocument();
    });

    // Click the top Create Project button to open the form
    const createButton = screen.getByRole("button", {
      name: /Create Project/i,
    });

    fireEvent.click(createButton);

    // Fill project title
    const titleInput = screen.getByPlaceholderText(
      "Enter project title"
    );

    fireEvent.change(titleInput, {
      target: {
        value: "Test Campus Project",
      },
    });

    // Fill project description
    const descriptionInput =
      screen.getByPlaceholderText(
        "Describe your project"
      );

    fireEvent.change(descriptionInput, {
      target: {
        value: "Project created during testing.",
      },
    });

    // Fill technologies
    const technologiesInput =
      screen.getByPlaceholderText(
        "React, Node.js, PostgreSQL"
      );

    fireEvent.change(technologiesInput, {
      target: {
        value: "React, Node.js, PostgreSQL",
      },
    });

    // Find the form
    const form = screen.getByRole("button", {
      name: "Cancel",
    }).closest("form");

    // Find Create Project submit button inside the form
    const submitButton = within(form).getByRole("button", {
      name: "Create Project",
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith(
        "/projects",
        {
          title: "Test Campus Project",
          description: "Project created during testing.",
          technologies: "React, Node.js, PostgreSQL",
          status: "Active",
        }
      );
    });
  });
});