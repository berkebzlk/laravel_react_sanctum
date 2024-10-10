import React, { useState } from 'react'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {Link} from 'react-router-dom'

import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack, useColorModeValue } from '@chakra-ui/react'

import PreviewOptionsNavbar from '../../components/layouts/PreviewOptionsNavbar'
import { BrandName } from '../../constants'



const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useAuthStore((state) => state.login);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('handlesubmit register')
        try {
            const registrerResponse = await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation:password
            });

            console.log('response', registrerResponse)

            if (registrerResponse.status !== 200) {
                console.log('registrerResponse de hata')
                return;
            }

            console.log('register navigate oncesi')
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message || 'Register failed!');
            } else {
                console.log('An unexpected error occurred!');
            }
        }
    };


    return (
        <>
            <title>Auth Simple | {BrandName}</title>
            <PreviewOptionsNavbar />
            <Flex minH="100vh" align="center" bg={useColorModeValue("gray.100", "gray.900")}>
                <VStack
                    w={{ base: '100%', md: '60%', lg: '45%', xl: '35%' }}
                    mx='auto'
                    p='10'
                    h="100%"
                    rounded='lg'
                    shadow='sm'
                    bg={useColorModeValue("white", "gray.800")}
                    spacing="4"
                >
                    <Heading as='h1' fontSize="3xl">Sign up to {BrandName}</Heading>
                    <VStack spacing="5" w='100%' align="start" as="form">
                    <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email Address</FormLabel>
                            <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" />
                        </FormControl>
                        <Button onClick={handleSubmit} w='full' size="lg" colorScheme='blue'>Sign In</Button>
                    </VStack>
                    <Text fontWeight="medium">
                        Have an account? {' '}
                        <Link to="/login" color="blue.400">Login</Link>
                    </Text>
                </VStack>
            </Flex>
        </>
    )
}

export default Login