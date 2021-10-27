import WebSocket from "ws";
import Question from "./../model/QuestionModel.js";
import { findAll } from "../database/query.js";

function handleInitGame(clientSocket, Rooms, msg) {
  Rooms.forEach(async (room) => {
    if (room.id === msg.roomId) {
      try {
        const quizId = msg.quizId;
        const questions = await findAll(Question, { quizId: quizId });
        room.host = clientSocket;
        room.host.send(JSON.stringify({ type: "question:", questions }));
        room.players.forEach((player) => {
          if (player.player.readyState === WebSocket.OPEN) {
            player.player.send(JSON.stringify({ type: "start", roomId: room.id }));
          }
        });
      } catch (error) {
        room.host.send(JSON.stringify({ type: "error", msg: "could not get questions" }));
      }
      return;
    }
  });
}

export default handleInitGame;
