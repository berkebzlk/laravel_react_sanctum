import React, { useState } from 'react'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore'; // Zustand store'unu içe aktar

import { Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, VStack, useColorModeValue } from '@chakra-ui/react'

import PreviewOptionsNavbar from '../../components/layouts/PreviewOptionsNavbar'
import { BrandName } from '../../constants'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useAuthStore((state) => state.login);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('handlesubmit')
        try {
            const loginResponse = await axios.post('/login', {
                email,
                password,
            });

            console.log('response', loginResponse)

            if (loginResponse.status !== 200) {
                console.log('login de hata')
                return;
            }

            const token = loginResponse.data.access_token;

            const userResponse = await axios.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const user = userResponse.data;

            login(token, user);
            console.log('navigate oncesi')
            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data.message || 'Login failed!');
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
                    <Heading as='h1' fontSize="3xl">Sign in to {BrandName}</Heading>
                    <VStack spacing="5" w='100%' align="start" as="form">
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
                        Don't have an account? {' '}
                        <Link href="/register" color="blue.400">Register</Link>
                    </Text>
                </VStack>
            </Flex>
        </>
    )
}

export default Login