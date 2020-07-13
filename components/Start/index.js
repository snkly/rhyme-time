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

function Start() {
  
  const [nickname, setNickname] = useState("");

  const joinRoom = e => {
    e.preventDefault();
    Router.push(`/game`);
  };

  return (
    <Stack spacing={8} pt="6rem">
      <Flex
        as="form"
        width="100%"
      >
        <FormControl flexGrow="1">
          <Input
            id="nickname"
            name="aawdawdawd"
            placeholder="What's your nickname?"
            size="lg"
            onChange={e => setNickname(e.target.value.substr(0, 12))}
          />
        </FormControl>
        <Link
          href={`/game`}
        >
          <Button
            flexGrow="0"
            variantColor="teal"
            size="lg"
            isDisabled={!nickname}
          >
            Join the game!
          </Button>
        </Link>
      </Flex>

      
    </Stack>
  )
}

export default Start