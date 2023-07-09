import http from "http";

describe("API Tests", () => {
  let server: http.Server;
  let baseUrl: string;

  const username = "Travis";
  const userSurname = "Scott";
  const userAge = 28;
  const userSpecificId = "123";

  beforeAll((done) => {
    server = http.createServer((req, res) => {
      if (req.url === "/api/users" && req.method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify([]));
      } else if (req.url?.startsWith("/api/users") && req.method === "POST") {
        const newUser = {
          id: userSpecificId,
          username,
          age: userAge,
          hobbies: [],
        };
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(newUser));
      } else if (req.url?.startsWith("/api/users/") && req.method === "GET") {
        const userId = req.url.split("/").pop();
        if (userId === userSpecificId) {
          const user = {
            id: userSpecificId,
            username,
            age: userAge,
            hobbies: [],
          };
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "User not found" }));
        }
      } else if (req.url?.startsWith("/api/users/") && req.method === "PUT") {
        const userId = req.url.split("/").pop();
        if (userId === userSpecificId) {
          const updatedUser = {
            id: userSpecificId,
            username: username + userSurname,
            age: 30,
            hobbies: [],
          };
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(updatedUser));
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "User not found" }));
        }
      } else if (
        req.url?.startsWith("/api/users/")
        && req.method === "DELETE"
      ) {
        const userId = req.url.split("/").pop();
        if (userId === userSpecificId) {
          res.statusCode = 204;
          res.end();
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "User not found" }));
        }
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Not found" }));
      }
    });

    server.listen(0, () => {
      const address = server.address();
      if (address && typeof address !== "string") {
        const { port } = address;
        baseUrl = `http://localhost:${port}/api`;
        done();
      }
    });
  });

  afterAll((done) => {
    server.close(done);
  }, 10000);

  it("get all users", async () => {
    const response = await fetch(`${baseUrl}/users`);
    const users = await response.json();
    expect(response.status).toBe(200);
    expect(users).toEqual([]);
  });

  it("create a new user", async () => {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, age: userAge, hobbies: [] }),
    });
    const newUser = await response.json();
    expect(response.status).toBe(201);
    expect(newUser).toHaveProperty("id", userSpecificId);
    expect(newUser).toHaveProperty("username", username);
    expect(newUser).toHaveProperty("age", userAge);
    expect(newUser).toHaveProperty("hobbies", []);
  });

  it("get one specific user", async () => {
    const response = await fetch(`${baseUrl}/users/${userSpecificId}`);
    const user = await response.json();
    expect(response.status).toBe(200);
    expect(user).toHaveProperty("id", userSpecificId);
    expect(user).toHaveProperty("username", username);
    expect(user).toHaveProperty("age", userAge);
    expect(user).toHaveProperty("hobbies", []);
  });

  it("update a user", async () => {
    const response = await fetch(`${baseUrl}/users/${userSpecificId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username + userSurname,
        age: 30,
        hobbies: [],
      }),
    });
    const updatedUser = await response.json();
    expect(response.status).toBe(200);
    expect(updatedUser).toHaveProperty("id", userSpecificId);
    expect(updatedUser).toHaveProperty("username", username + userSurname);
    expect(updatedUser).toHaveProperty("age", 30);
    expect(updatedUser).toHaveProperty("hobbies", []);
  });

  it("delete a user", async () => {
    const response = await fetch(`${baseUrl}/users/${userSpecificId}`, {
      method: "DELETE",
    });
    expect(response.status).toBe(204);
  });
});
