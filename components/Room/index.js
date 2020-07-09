import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import uuidv4 from "uuid/v4";

const EVENT = {
  CONNECT: "connect",
  CONNECT_ERROR: "connect_error",
  DISCONNECT: "disconnect",
  DISCONNECTING: "disconnecting",
  GENERAL_ERROR: "general_error",
  CLIENT_JOIN_ROOM: "client_join_room",
  CLIENT_LEAVE_ROOM: "client_leave_room",
  SERVER_JOIN_ERROR: "server_join_error",
  SERVER_UPDATE_PLAYER_LIST: "server_update_player_list",
};

const socket = io('http://localhost:3000');
const id = uuidv4();

const Room = ({ nickname }) => {
  const player = {
    id,
    nickname
  };

  useEffect(() => {
    joinRoom();
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.on(EVENT.CONNECT, joinRoom);
    socket.on(EVENT.CONNECT_ERROR, handleError);
    socket.on(EVENT.SERVER_JOIN_ERROR, handleError);
    socket.on(EVENT.SERVER_UPDATE_PLAYER_LIST, updatePlayerList);

    return () => {
      socket.off(EVENT.CONNECT, joinRoom);
      socket.off(EVENT.CONNECT_ERROR, handleError);
      socket.off(EVENT.SERVER_JOIN_ERROR, handleError);
      socket.off(EVENT.SERVER_UPDATE_PLAYER_LIST, updatePlayerList);
    };
  });

  const joinRoom = () => {
    socket.emit(EVENT.CLIENT_JOIN_ROOM, player, updatePlayerList);
  };

  const [playerList, setPlayerList] = useState(Array(8).fill(null));
  const updatePlayerList = players => {
    setPlayerList(players);
  };

  const handleError = err => {
    console.log(err);
    alert(err);
    socket.close();
  };

  return (
    <div>
      {playerList.map((p, i) => {
        if (!p) {
          return (
            <div key={i} className="player">
              <span className="player-name empty">empty</span>
            </div>
          );
        } else {
          return (
            <div key={i} className="player">
              <i className="snes-jp-logo" />{" "}
              <span className="player-name">{p.nickname}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

Room.propTypes = {
  nickname: PropTypes.string.isRequired
};

export default Room;