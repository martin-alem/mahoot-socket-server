function handleLockGame(clientSocket, Rooms, msg) {
  Rooms.forEach((room) => {
    if (room.quiz === msg.quizId) {
      room.isOpened = msg.state;
      room.host = clientSocket;
      room.host.send(JSON.stringify({ type: "room_state", state: room.isOpened }));
    } else {
      room.host.send(JSON.stringify({ type: "error", msg: "could not chang room state" }));
    }
  });
}

export default handleLockGame;
