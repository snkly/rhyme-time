import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import uuidv4 from "uuid/v4";
import PlayerList from "../PlayerList";
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Main } from '@components/Main'
import { Footer } from '@components/Footer'
import { ThemeSwap } from '@components/ThemeSwap'
import {
  Box,
  Spinner,
  Text
} from "@chakra-ui/core";

const socket = io("http://localhost:3000", {
  autoConnect: false
});
const id = uuidv4();

const EVENT = {
  CONNECT_ERROR: "connect_error",
  JOIN_ROOM: "join_room",
  JOIN_ROOM_ERROR: "join_room_error",
  LEAVE_ROOM: "leave_room",
  UPDATE_PLAYER_LIST: "update_player_list"
};

//console.log(id);
//console.log(socket);
const Room = ({ nickname }) => {
  const [player, setPlayer] = useState({ id, nickname });
  useEffect(() => {
    setPlayer({
      id,
      nickname
    });
  }, [nickname]);

  const [loggerText, setLoggerText] = useState("waiting for 1 more players..");
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    socket.connect();
    joinRoom();
    return () => {
      socket.close();
    };
  }, []);

  const joinRoom = () => {
    socket.emit(EVENT.JOIN_ROOM, player, handleJoinRoom);
  };

  useEffect(() => {
    socket.on(EVENT.CONNECT_ERROR, handleError);
    socket.on(EVENT.JOIN_ROOM_ERROR, handleError);
    socket.on(EVENT.UPDATE_PLAYER_LIST, updatePlayerList);

    return () => {
      socket.off(EVENT.CONNECT_ERROR, handleError);
      socket.off(EVENT.JOIN_ROOM_ERROR, handleError);
      socket.off(EVENT.UPDATE_PLAYER_LIST, updatePlayerList);
    };
  });

  const handleError = err => {
    console.log(err);
    alert(err.message);
    Router.push("/");
  };

  const handleJoinRoom = players => {
    updatePlayerList(players);
    setIsConnecting(false);
  };

  const [playerList, setPlayerList] = useState(Array(8).fill(null));
  const updatePlayerList = players => {
    setPlayerList(players);
    if (players.filter(p => p !== null).length === 1) {
      setLoggerText("waiting for 1 more players..");
    } else {
      setLoggerText("waiting for next round..");
    }
  };

  return (
    <Container>
      <Main>
        <Header />
        <PlayerList playerList={playerList} />
        {loggerText && <Text fontSize="xl">{loggerText}</Text>}
        {isConnecting && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />)}
      </Main>

      <ThemeSwap />
      <Footer>
        <Text>Typing game, wow ⚡</Text>
      </Footer>
    </Container>
  );
};

Room.propTypes = {
  nickname: PropTypes.string.isRequired
};

export default Room;