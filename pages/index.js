import Head from 'next/head'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Main } from '@components/Main'
import { Footer } from '@components/Footer'
import { ThemeSwap } from '@components/ThemeSwap'
import Game from '@components/Game'
import {
  Link as ChakraLink,
  Box,
  Text,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/core'

const Index = ({ words }) => (
  <Container>
    <Head>
      <title>Typing game</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main>
      <Header />
      <Game words={words}/>
      <Box pt={12}>
        {words.map((e, i) => <span key={i}>{e.word} </span>)}
      </Box>
    </Main>

    <ThemeSwap />
    <Footer>
      <Text>Typing game, wow ⚡</Text>
    </Footer>
  </Container>
)

// https://www.datamuse.com/api/
export async function getStaticProps() {
  // adjectives describing javascript sorted by how related they are to programming
  const res = await fetch('https://api.datamuse.com/words?rel_jjb=javascript&topics=programming')
  const json = await res.json()
  return {
    props: {
      words: json,
    },
  }
}

export default Index