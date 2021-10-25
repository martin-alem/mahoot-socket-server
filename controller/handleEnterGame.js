function handleEnterGame(clientSocket, Rooms, msg) {
  Rooms.forEach((room) => {
    if (room.id === msg.roomId && room.isOpened === true) {
      const nkName = msg.nickname.toLowerCase();
      if (room.players.find((player) => player.nickname === nkName) === undefined) {
        room.players.push({ nickname: nkName, player: clientSocket });
        room.host.send(JSON.stringify({ type: "join", nickname: msg.nickname }));
        clientSocket.send(JSON.stringify({ type: "roomId", roomId: room.id }));
      } else {
        clientSocket.send(JSON.stringify({ type: "error", msg: "nickname already taken" }));
      }
    } else {
      clientSocket.send(JSON.stringify({ type: "error", msg: "room closed" }));
    }
  });
}

export default handleEnterGame;
