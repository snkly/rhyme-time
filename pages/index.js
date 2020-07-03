import Head from 'next/head'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Main } from '@components/Main'
import { Footer } from '@components/Footer'
import { ThemeSwap } from '@components/ThemeSwap'
import Game from '@components/Game'
import {
  Link as ChakraLink,
  Text,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/core'

const Index = () => (
  <Container>
    <Head>
      <title>Typing game</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main>
      <Header />
      <Game />
    </Main>

    <ThemeSwap />
    <Footer>
      <Text>Typing game, wow ❤️ </Text>
    </Footer>
  </Container>
)

export default Index