const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const next = require("next");
const PlayerManager = require('./playerManager')

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
const io = socketio(server);

const dev = process.env.NODE_ENV !== "prodcution";
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
      console.log(`URL requested: ${req.url}`);
      return nextHandler(req, res);
  })

  server.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server listening on port ${PORT}`);
  })
})

const pm = new PlayerManager();
console.log(pm);
const EVENT = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "join_room",
  JOIN_ROOM_ERROR: "join_room_error",
  LEAVE_ROOM: "leave_room",
  UPDATE_PLAYER_LIST: "update_player_list"
};

io.on(EVENT.CONNECT, socket => {
  console.log("Received a " + socket.handshake.query.role + " connection: " + socket.id);

  socket.on(EVENT.JOIN_ROOM, (player, handleJoinRoom) => {
    try {
      pm.addPlayer({ ...player, socketId: socket.id });
      handleJoinRoom(pm.players);
      console.log('server trying to add player wow');
      io.emit(EVENT.UPDATE_PLAYER_LIST, pm.players);
    } catch (err) {
      socket.emit(EVENT.JOIN_ROOM_ERROR, err);
      console.log('server fail at trying to add player cool');
      socket.disconnect(true);
    }
  });

  socket.on(EVENT.LEAVE_ROOM, player => {
    console.log('server socket event.leave_room');
    pm.removePlayerBySocketId(player.socketId);
    socket.broadcast.emit(EVENT.UPDATE_PLAYER_LIST, pm.players);
  });

  socket.on(EVENT.DISCONNECT, e => {
    const player = pm.removePlayerBySocketId(socket.id);
    if (player) {
      socket.broadcast.emit(EVENT.UPDATE_PLAYER_LIST, pm.players);
    }
  });
});
