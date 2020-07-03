import { useReducer, useState, useEffect } from "react";
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
import { useForm } from "react-hook-form"

export default function Game() {
  let initialState = {
    gameState: 'NOT_STARTED', // In progress, 
    score: 0,
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
  const { handleSubmit, errors, register, formState } = useForm();

  function validateName(value) {
    let error;
    if (!value) {
      error = "An answer is required!";
    } else if (value !== "correct") {
      error = "Type 'correct', ~validation~";
    }
    return error || true;
  }

  function onSubmit(values) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 1000);
  }

  return (
    <Stack spacing={8} pt="6rem">
      <Box>
        <Text fontSize="2xl">I ask you to do something here.</Text>
      </Box>

      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
      >
        <FormControl isInvalid={errors.name} flexGrow="1">
          <Input
            name="name"
            placeholder="type answers here"
            size="lg"
            ref={register({ validate: validateName })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          variantColor="teal"
          size="lg"
          isLoading={formState.isSubmitting}
          type="submit"
          flexGrow="0"
        >
          Submit
          </Button>
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
};