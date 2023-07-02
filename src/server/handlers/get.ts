import { IncomingMessage, ServerResponse } from "http";
import * as dotenv from "dotenv";
import { User } from "../../types/types";
import isUuidValid from "../../utils/uuid";
import sendResponse from "../../utils/response";
import users from "../../users/users";

dotenv.config();

const handleGetUsers = (req: IncomingMessage, res: ServerResponse) => {
  sendResponse<User[]>(res, 200, users);
};

const handleGetUserById = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split("/")[3];

  if (!userId || !isUuidValid(userId)) {
    sendResponse(res, 400, { message: "Invalid user ID" });
    return;
  }

  const user = users.find((idUser) => idUser.id === userId);
  if (!user) {
    sendResponse(res, 404, { message: "User not found" });
    return;
  }

  sendResponse(res, 200, user);
};

export { handleGetUsers, handleGetUserById };
