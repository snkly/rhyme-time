import { useReducer, useState, useEffect } from "react"
import { Flex } from '@chakra-ui/core'

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

  return (
    <Flex justifyContent="center" alignItems="center">
      {gameState === "NOT_STARTED" && (
        <button onClick={() => {
          dispatch({ type: "START_GAME" });
        }}>
          Start Game
        </button>
      )}
      {gameState === "STARTED" && (
        <button onClick={() => {
          dispatch({ type: "END_GAME" });
        }}>
          End Game
        </button>
      )}
      {gameState === "FINISHED" && (
        <>
          <div>Score: {score}</div>
          <button onClick={() => {
            dispatch({ type: "RESTART_GAME" });
          }}>
            Try again
      </button>
        </>
      )}
      <input onSubmit={(e) => console.log(e.target.value)} />
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </Flex>
  )
};