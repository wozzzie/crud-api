import { IncomingMessage, ServerResponse } from "http";
import * as dotenv from "dotenv";
import isUuidValid from "../../utils/uuid";
import sendResponse from "../../utils/response";
import users from "../../users/users";

dotenv.config();

const handleUpdateUser = (req: IncomingMessage, res: ServerResponse) => {
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

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || !age || !hobbies) {
        sendResponse(res, 400, {
          message: "Username and age, hobbies are required",
        });
        return;
      }

      user.username = username;
      user.age = age;
      user.hobbies = hobbies || [];

      sendResponse(res, 200, user);
    } catch (error) {
      sendResponse(res, 400, { message: "Invalid request body" });
    }
  });
};

export default handleUpdateUser;
