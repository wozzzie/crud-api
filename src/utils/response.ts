import { ServerResponse } from "http";
import { ApiResponse } from "../types/types";

function sendResponse<T>(res: ServerResponse, statusCode: number, data?: T) {
  const response: ApiResponse<T> = {
    statusCode,
    data,
  };

  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
}
export default sendResponse;
