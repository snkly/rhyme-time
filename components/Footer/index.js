import { Flex } from '@chakra-ui/core'

export const Footer = (props) => (
<Flex as="footer"  flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    justify="center"
    maxWidth="48rem"
    py={8} {...props} />
)