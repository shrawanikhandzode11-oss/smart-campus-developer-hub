const {
  describe,
  test,
  expect,
  beforeEach,
} = require("@jest/globals");

jest.mock("../db", () => ({
  query: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUsers,
  loginUser,
} = require("../controllers/userController");

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // CREATE USER
  test("should create a user successfully", async () => {
    // First query checks whether email already exists
    pool.query.mockResolvedValueOnce({
      rows: [],
    });

    // Mock password hashing
    bcrypt.hash.mockResolvedValue("hashed-password");

    // Second query inserts the user
    pool.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          created_at: "2026-09-05",
        },
      ],
    });

    const req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(
      "password123",
      10
    );

    expect(pool.query).toHaveBeenCalledTimes(2);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: "Test User",
        email: "test@example.com",
      })
    );
  });

  // GET ALL USERS
  test("should get all users successfully", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: "Test User",
          email: "test@example.com",
        },
        {
          id: 2,
          name: "Another User",
          email: "another@example.com",
        },
      ],
    });

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUsers(req, res);

    expect(pool.query).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Test User",
        }),
        expect.objectContaining({
          name: "Another User",
        }),
      ])
    );
  });

  // LOGIN USER
  test("should login successfully with valid credentials", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          password: "hashed-password",
        },
      ],
    });

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue("test-jwt-token");

    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await loginUser(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password123",
      "hashed-password"
    );

    expect(jwt.sign).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: "test-jwt-token",
      })
    );
  });
});