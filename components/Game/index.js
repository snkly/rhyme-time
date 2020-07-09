import { useReducer, useState } from "react"
import Link from "next/link";
import Router from 'next/router'
import fetch from 'node-fetch'
import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Stack,
  Text
} from "@chakra-ui/core";

function Game({ words }) {
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
  const [nickname, setNickname] = useState("");

  const joinRoom = e => {
    e.preventDefault();
    Router.push(`/room?u=${nickname}`);
  };

  return (
    <Stack spacing={8} pt="6rem">
      <Flex
        as="form"
        onSubmit={joinRoom}
        width="100%"
      >
        <FormControl flexGrow="1">
          <Input
            id="nickname"
            name="answer"
            placeholder="What's your nickname?"
            size="lg"
            onChange={e => setNickname(e.target.value.substr(0, 12))}
          />
        </FormControl>
        <Link
          href={`/room?u=${nickname}`}
        >
          <Button
            flexGrow="0"
            variantColor="teal"
            size="lg"
            isDisabled={!nickname}
          >
            Join Room
          </Button>
        </Link>
      </Flex>

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
    </Stack>
  )
}

export default Game