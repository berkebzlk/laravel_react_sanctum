import { ChakraProvider } from '@chakra-ui/react'

import { Font, theme } from './theme/config'
import Router from './routes/index'

export default function App() {

    return (
        <ChakraProvider theme={theme}>
            <Font />
            <Router />
        </ChakraProvider>
    )
}
