import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import handleConnection from "./controller/handleConnection.js";
import handleJoinGame from "./controller/handleJoinGame.js";
import handleEnterGame from "./controller/handleEnterGame.js";
import handleLockGame from "./controller/handleLockGame.js";
// import handleInitGame from "./controller/handleInitGame.js";
// import handleQuestionController from "./controller/handleQuestionController.js";
import connectToMahootDatabase from "./database/connection.js";
// import handleAnswerController from "./controller/handleAnswerController.js";
// import cors from "./middleware/cors.js";
// import authentication from "./middleware/authentication.js";

//RYN6E8UaRySqn6r
dotenv.config();

connectToMahootDatabase();

const server = createServer();
const webSocketServerInstance = new WebSocketServer({ noServer: true });

const Rooms = [];

webSocketServerInstance.on("connection", function connection(ws) {
  ws.on("message", (data, isBoolean) => {
    const msg = JSON.parse(data.toString());
    if (msg.type === "create") {
      handleConnection(ws, Rooms, msg);
    } else if (msg.type === "join") {
      handleJoinGame(ws, Rooms, msg);
    } else if (msg.type === "enter") {
      handleEnterGame(ws, Rooms, msg);
    } else if (msg.type === "room_state") {
      handleLockGame(ws, Rooms, msg);
    }
  });
});

server.on("request", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify({ statusCode: 200, statusText: "OK", message: "This is a socket server" }));
});

server.on("upgrade", function (req, socket, head) {
  const url = req.url;
  const method = req.method;
  console.log(url);

  if (url === "/api/admin" && method === "GET") {
    webSocketServerInstance.handleUpgrade(req, socket, head, function (ws) {
      webSocketServerInstance.emit("connection", ws, req);
    });
  } else if (url === "/api/play" && method === "GET") {
    webSocketServerInstance.handleUpgrade(req, socket, head, function (ws) {
      webSocketServerInstance.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Socket server listening on port " + PORT);
});
