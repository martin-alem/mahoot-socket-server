import WebSocket from "ws";

function handleInitGame(clientSocket, Rooms, msg) {
  Rooms.forEach((room) => {
    if (room.id === msg.roomId) {
      room.host = clientSocket;
      room.players.forEach((player) => {
        if (player.player.readyState === WebSocket.OPEN) {
          player.player.send(JSON.stringify({ type: "start", roomId: room.id }));
        }
      });
    }
  });
}

export default handleInitGame;
