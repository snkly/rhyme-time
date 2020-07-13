import PropTypes from "prop-types";
import { useEffect, useRef, useState, useReducer } from "react";
import io from "socket.io-client";
import uuidv4 from "uuid/v4";
import PlayerList from "../PlayerList";
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Main } from '@components/Main'
import { Footer } from '@components/Footer'
import { ThemeSwap } from '@components/ThemeSwap'
import {
  Button,
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
const Game = ({ nickname }) => {
  let initialState = {
    gameState: 'NOT_STARTED', // In progress, 
    score: 0
  }

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START_GAME": {
        return { ...state, gameState: "STARTED" };
      }
      case "END_GAME": {
        return { ...state, gameState: "FINISHED" };
      }
      case "RESTART_GAME": {
        return { ...state, gameState: "STARTED", score: 0 };
      }
      default: {
        throw new Error("What state?")
      }
    }
  }, initialState);

  let { gameState, score } = state;

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
    console.log('Connect to socket, Join Room, ' + player);
    socket.connect();
    joinRoom();
    return () => {
      socket.close();
    };
  }, []);

  const joinRoom = () => {
    console.log('Emit Join Room, player: ' + player);
    socket.emit(EVENT.JOIN_ROOM, player, handleJoinRoom);
  };

  useEffect(() => {
    socket.on('now, data')
    console.log('UseEffect in Room... hopefully update player list next');
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
    console.log('join room, set is connecting false');
    updatePlayerList(players);
    setIsConnecting(false);
  };

  const [playerList, setPlayerList] = useState(Array(8).fill(null));
  const updatePlayerList = players => {
    console.log('update player list! set em..');
    console.log(players);
    setPlayerList(players);
    console.log(players);
    if (players.filter(p => p !== null).length === 1) {
      setLoggerText("waiting for 1 more players..");
    } else {
      setLoggerText("waiting for next round..");
    }
  };

  return (
    <Container>
      <Main>
        <Text>Cool, you're in!</Text>
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
          <Box>
        {gameState === "NOT_STARTED" && (
          <Button
            onClick={() => dispatch({ type: "START_GAME" })}
            mt={4}
            variantColor="green"
            size="lg"
          >
            Start Game
          </Button>
        )}
        {gameState === "STARTED" && (
          <Button
            onClick={() => dispatch({ type: "END_GAME" })}
            mt={4}
            variantColor="orange"
            size="lg"
          >
            End Game
          </Button>
        )}
        {gameState === "FINISHED" && (
          <>
            <Button
              onClick={() => dispatch({ type: "RESTART_GAME" })}
              mt={4}
              variantColor="green"
              size="lg"
            >
              Try again
           </Button>
            <Box pt="2rem">Score: {score}</Box>
          </>
        )}
      </Box>
      </Main>

      <ThemeSwap />
      <Footer>
        <Text>Typing game, wow ⚡</Text>
      </Footer>
    </Container>
  );
};

Game.propTypes = {
  nickname: PropTypes.string.isRequired
};

export default Game;