import Logger from "./../utils/Logger.js";
import jwt from "jsonwebtoken";
import sendResponse from "./sendResponse.js";
function authentication(req, res) {
  const _access_token = req.headers.cookie.split("=")[1];
  try {
    jwt.verify(_access_token, process.env.JWT_SECRET);
  } catch (error) {
    Logger.log("error", error, import.meta.url);
    const options = { statusCode: 401, statusText: "fail", message: "Unauthorized" };
    sendResponse(req, res, options);
  }
}

export default authentication;
