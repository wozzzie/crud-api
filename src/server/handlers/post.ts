import { IncomingMessage, ServerResponse } from "http";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import sendResponse from "../../utils/response";
import users from "../../users/users";

dotenv.config();

const handleCreateUser = (req: IncomingMessage, res: ServerResponse) => {
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

      const newUser = {
        id: uuidv4(),
        username,
        age,
        hobbies: hobbies || [],
      };

      users.push(newUser);
      sendResponse(res, 201, newUser);
    } catch (error) {
      sendResponse(res, 400, { message: "Invalid request body" });
    }
  });
};

export default handleCreateUser;
