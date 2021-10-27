function handleAnswerController(clientSocket, Rooms, msg) {
  Rooms.forEach((room) => {
    if (room.id === msg.roomId && room.quiz === msg.quizId) {
      room.host.send(JSON.stringify({ "type": "answer", "nickname": msg.nickname, "questionId": msg.question_id, "answer": msg.answer }));
      return;
    }
  });
}

export default handleAnswerController;
