import { Flex, Heading } from '@chakra-ui/core'

export const Header = ({ title }) => (
  <Flex justifyContent="center" alignItems="center">
    <Heading fontSize="50px">{title}</Heading>
  </Flex>
)

Header.defaultProps = {
  title: `Rhyme Time`
}