import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import API from "../services/api";

vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("should login successfully with valid credentials", async () => {
    API.post.mockResolvedValue({
      data: {
        token: "test-token",
        user: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
        },
      },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith("/users/login", {
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(localStorage.getItem("token")).toBe("test-token");

    expect(JSON.parse(localStorage.getItem("user"))).toEqual({
      id: 1,
      name: "Test User",
      email: "test@example.com",
    });

    expect(screen.getByText("Login successful!")).toBeInTheDocument();
  });

  test("should display error message when login fails", async () => {
    API.post.mockRejectedValue({
      response: {
        data: {
          message: "Invalid email or password",
        },
      },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText("Invalid email or password")
      ).toBeInTheDocument();
    });
  });
});