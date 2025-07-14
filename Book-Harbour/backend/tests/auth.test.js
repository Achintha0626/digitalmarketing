
import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";


jest.mock("../src/utils/passwordUtils.js", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashed_pw"),
  comparePassword: jest.fn((pw, hash) =>
    
    Promise.resolve(pw === "achintha")
  ),
}));

jest.mock("../src/utils/tokenUtils.js", () => ({
  createJWT: jest.fn(() => "fake.jwt.token"),
  verifyJWT: jest.fn(() => ({ id: "123" })),
}));

describe("Auth routes", () => {
  describe("POST /api/v1/auth/register", () => {
    it("returns 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ email: "achintha@gmail.com", password: "achintha" });

      expect(res.status).toBe(400);
      expect(typeof res.body.msg).toBe("string");
      expect(res.body.msg).toMatch(/firstName is required/);
      expect(res.body.msg).toMatch(/lastName is required/);
    });

    it("registers a new user", async () => {
      const payload = {
        firstName: "Achintha",
        lastName: "Prabshwara",
        email: "achintha@gmail.com",
        password: "achintha",
      };
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token", "fake.jwt.token");
      expect(res.body.user).toMatchObject({
        firstName: "Achintha",
        lastName: "Prabshwara",
        email: "achintha@gmail.com",
      });

      const dbUser = await User.findOne({ email: "achintha@gmail.com" });
      expect(dbUser).toBeTruthy();
    });

    it("returns 400 on duplicate email", async () => {
    
      await User.create({
        firstName: "Achintha",
        lastName: "Prabshwara",
        email: "achintha@gmail.com",
        password: "whatever",
      });

      
      const res = await request(app).post("/api/v1/auth/register").send({
        firstName: "Achintha",
        lastName: "Prabshwara",
        email: "achintha@gmail.com",
        password: "achintha",
      });

      expect(res.status).toBe(400);
      expect(res.body.msg).toBe("Email already in use");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      
      await User.create({
        firstName: "Achintha",
        lastName: "Prabshwara",
        email: "achintha@gmail.com",
        password: "hashed_pw",
      });
    });

    it("logs in with correct credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "achintha@gmail.com",
        password: "achintha",
      });

      expect(res.status).toBe(200);
      expect(res.body.token).toBe("fake.jwt.token");
      expect(res.body.user.email).toBe("achintha@gmail.com");
    });

    it("returns 401 on invalid credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "achintha@gmail.com",
        password: "wrong_password",
      });

      expect(res.status).toBe(401);
      expect(res.body.msg).toBe("Invalid credentials");
    });
  });

  describe("GET /api/v1/auth/logout", () => {
    it("logout route is not defined (404)", async () => {
      const res = await request(app).get("/api/v1/auth/logout");
      expect(res.status).toBe(404);
    });
  });
});
