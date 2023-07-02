import { createServer, IncomingMessage, ServerResponse } from "http";
import handleDeleteUser from "./server/handlers/delete";
import { handleGetUsers, handleGetUserById } from "./server/handlers/get";
import handleCreateUser from "./server/handlers/post";
import handleUpdateUser from "./server/handlers/put";
import sendResponse from "./utils/response";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.method === "GET" && req.url === "/api/users") {
      handleGetUsers(req, res);
    } else if (req.method === "GET" && req.url?.startsWith("/api/users/")) {
      handleGetUserById(req, res);
    } else if (req.method === "POST" && req.url === "/api/users") {
      handleCreateUser(req, res);
    } else if (req.method === "PUT" && req.url?.startsWith("/api/users/")) {
      handleUpdateUser(req, res);
    } else if (req.method === "DELETE" && req.url?.startsWith("/api/users/")) {
      handleDeleteUser(req, res);
    } else {
      sendResponse(res, 404, { message: "Not found" });
    }
  } catch (error) {
    sendResponse(res, 500, { message: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
