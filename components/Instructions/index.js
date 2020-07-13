import { useEffect, useRef, useState, useReducer } from "react";
import { useInterval } from 'ahooks';
import { Box, Flex, Text, Badge } from '@chakra-ui/core'

export const Instructions = ({ words }) => {
  const allRhymes = words.map((e, i) => e.word);
  const [count, setCount] = useState(0);
  const [rhymes, setRhymes] = useState([]);

  useInterval(() => {
    console.log('Connect to socket, Join Room, ');
    setRhymes(allRhymes[count])
    setCount(count + 1)
  }, 2000);

  return (<>
    <Flex justifyContent="center" alignItems="center">
      <Text fontSize="30px" pb={6}>Join the game and test your rhyming skills. We provide a random word, and you type ryhmes for points. Who can find the most in 30 seconds? </Text>
    </Flex>
    <Box isInline>
      <Text fontSize="26px" d="inline-block">Rhyme <b>HAM</b>:</Text>
      <Badge variant="solid" variantColor="green"
          ml={3}
          textTransform="uppercase"
          d="inline-block"
          fontSize="26px" 
          verticalAlign="top"
        >
          {rhymes}
        </Badge>
    </Box>    
        
  </>
  )
}