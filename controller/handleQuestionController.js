import WebSocket from "ws";

function handleQuestionController(clientSocket, Rooms, msg) {
  Rooms.forEach((room) => {
    if (room.id === msg.roomId && room.quiz === msg.quizId) {
      room.host = clientSocket;
      room.players.forEach((player) => {
        if (player.player.readyState === WebSocket.OPEN) {
          player.player.send(JSON.stringify({ type: "question", roomId: room.id, question: msg.msg }));
        }
      });
      return;
    }
  });
}

export default handleQuestionController;
