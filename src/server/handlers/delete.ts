import { IncomingMessage, ServerResponse } from "http";
import * as dotenv from "dotenv";
import isUuidValid from "../../utils/uuid";
import sendResponse from "../../utils/response";
import users from "../../users/users";

dotenv.config();

const handleDeleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split("/")[3];

  if (!userId || !isUuidValid(userId)) {
    sendResponse(res, 400, { message: "Invalid user ID" });
    return;
  }

  const userIndex = users.findIndex((idUser) => idUser.id === userId);
  if (userIndex === -1) {
    sendResponse(res, 404, { message: "User not found" });
    return;
  }
  users.splice(userIndex, 1);

  sendResponse(res, 204);
};

export default handleDeleteUser;
