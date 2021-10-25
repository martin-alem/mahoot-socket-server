function handleJoinGame(clientSocket, Rooms, msg) {
  Rooms.forEach((room) => {
    if (room.id === msg.roomId && room.isOpened === true) {
      clientSocket.send(JSON.stringify({ type: "roomId", roomId: room.id }));
    } else {
      clientSocket.send(JSON.stringify({ type: "error", msg: "room closed" }));
    }
  });
}

export default handleJoinGame;
