import { getCode } from "./../utils/utils.js";

function handleConnection(clientSocket, Rooms, msg) {
  if (Rooms.find((room) => room.quiz === msg.quizId) === undefined) {
    const gameCode = getCode(6);
    const gameRoom = {
      id: gameCode,
      quiz: msg.quizId,
      players: [],
      isOpened: true,
      host: clientSocket,
    };
    Rooms.push(gameRoom);
    clientSocket.send(JSON.stringify({ type: "code", gameCode }));
  } else {
    Rooms.forEach((room) => {
      if (room.quiz === msg.quizId) {
        room.host = clientSocket;
      }
    });
  }
}

export default handleConnection;
