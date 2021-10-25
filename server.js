import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import handleConnection from "./controller/handleConnection.js";
import handleJoinGame from "./controller/handleJoinGame.js";
import handleEnterGame from "./controller/handleEnterGame.js";
import handleLockGame from "./controller/handleLockGame.js";
import handleInitGame from "./controller/handleInitGame.js";
// import cors from "./middleware/cors.js";
// import authentication from "./middleware/authentication.js";

dotenv.config();

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
    } else if (msg.type === "start") {
      handleInitGame(ws, Rooms, msg);
    }
  });
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
