import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Main } from '@components/Main'
import { Footer } from '@components/Footer'
import { ThemeSwap } from '@components/ThemeSwap'
import { Instructions } from '@components/Instructions'
import Start from '@components/Start'
import { getTimeLeft, getSeconds } from '@utils'
import {
  Link as ChakraLink,
  Box,
  Text
} from '@chakra-ui/core'

const Index = ({
  Words
}: {
  Words: [{
    word: string
    score: number
  }]
}) => (
    <Container>
      <Head>
        <title>Typing game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header />
        <Box pt={6}>
          <Instructions words={Words}/>
        </Box>
        <Start />
      </Main>

      <ThemeSwap />
      <Footer>
        <Text>Typing game, wow ⚡</Text>
      </Footer>
    </Container>
  )

// https://www.datamuse.com/api/
export const getStaticProps: GetStaticProps = async context => {
  // adjectives describing javascript sorted by how related they are to programming
  const res = await fetch('https://api.datamuse.com/words?rel_rhy=ham')
  const json = await res.json()
  console.log(json);
  return {
    props: {
      Words: json,
    },
  }
}

export default Index