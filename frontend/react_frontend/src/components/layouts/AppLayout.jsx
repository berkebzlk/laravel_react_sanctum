import { Box, Flex, HStack, Heading, Button, IconButton, List, Link, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue, useDisclosure, Collapse, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { AiOutlineHome, AiOutlineSetting, AiOutlineUserSwitch, AiOutlineFolderOpen, AiOutlineUser, AiOutlineDashboard, AiOutlineTable } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'

import { RiTodoLine } from 'react-icons/ri'
import { Outlet, NavLink } from 'react-router-dom'

import { BrandName } from "../../constants.js"
import axios from '../../axios.js'
import { useAuthStore } from '../../store/useAuthStore';
import ThemeToggle from './ThemeToggle.jsx'
import { useEffect, useState } from 'react'

export default function NavSidebar() {
    const { getButtonProps, isOpen } = useDisclosure({ defaultIsOpen: true })
    const buttonProps = getButtonProps()
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const [menu, setMenu] = useState([]);

    const handleLogout = async () => {
        try {
            if (!axios) {
                console.error('axios is null');
                return;
            }

            const response = await axios.post('/logout');

            if (!response || response.status !== 200) {
                console.error('Logout failed:', response);
                return;
            }

            logout();
        } catch (error) {
            console.error(error);
        } finally {
            window.location.reload();
        }
    };

    const fetchMenu = async () => {
        try {
            const response = await axios.get('/menu');

            if (!response || !response.data) {
                console.log('Menu data is empty');
                return;
            }

            const menu = response.data;
            setMenu(menu);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    const RecursiveAccordion = ({ items }) => {
        return (
            <Accordion allowMultiple>
                {items.map((item, index) => (
                    item.route
                        ?
                        <Link key={index} as={NavLink} to={item.route}>
                            <AccordionItem >
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            {item.name}
                                        </Box>
                                        {item.children && <AccordionIcon />}
                                    </AccordionButton>
                                </h2>
                                {item.children && (
                                    <AccordionPanel pb={4}>
                                        <RecursiveAccordion items={item.children} />
                                    </AccordionPanel>
                                )}
                            </AccordionItem>
                        </Link>
                        :
                        <AccordionItem key={index}>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        {item.name}
                                    </Box>
                                    {item.children && <AccordionIcon />}
                                </AccordionButton>
                            </h2>
                            {item.children && (
                                <AccordionPanel pb={4}>
                                    <RecursiveAccordion items={item.children} />
                                </AccordionPanel>
                            )}
                        </AccordionItem>
                ))}
            </Accordion>
        );
    };

    return (
        <>
            <Flex as="nav" alignItems="center" justifyContent="space-between" h='16' py='2.5' pr="2.5">
                <HStack spacing={2}>
                    <IconButton
                        {...buttonProps}
                        _active={{ bg: 'transparent' }}
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ bg: 'transparent' }}
                        fontSize="18px"
                        variant='ghost'
                        icon={<BiMenu />}
                        aria-label='open menu'
                    />                    <Heading as='h1' size="md"><Link as={NavLink} to={"/"}>{BrandName}</Link></Heading>
                </HStack>
                <HStack spacing="1">

                    <Flex alignItems={'center'} gap={2}>
                        <ThemeToggle />
                        <Menu>
                            <MenuButton
                                as={Button}
                                size="md"
                                aria-label="user icon"
                            >
                                <Flex gap={2} align={"center"} justify={"center"}>
                                    {<AiOutlineUser />} <Text>{user?.name}</Text>
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                <MenuItem><Link w={"100%"} h={"100%"} as={NavLink} to={"/profile"}>Profile</Link></MenuItem>
                                <MenuItem onClick={handleLogout}><Link w={"100%"} h={"100%"} as={NavLink} to={"#"}>Logout</Link></MenuItem>
                            </MenuList>
                        </Menu>

                    </Flex>
                </HStack>
            </Flex>
            <HStack align="start" spacing={0}>
                <Box as="aside" minH="90vh" minW={isOpen ? 250 : 12} borderRight="2px" borderColor={useColorModeValue('gray.200', 'gray.900')} transition="width 0.25s ease">
                    <List spacing={0} p="0.5">
                        {
                            <RecursiveAccordion items={menu} />
                        }
                    </List>
                </Box>
                <Flex as="main" w='full' minH="90vh" align="start" justify="start" bg={useColorModeValue('gray.50', 'gray.900')}>
                    <Box w={'100%'}>
                        <Outlet />
                    </Box>
                </Flex>
            </HStack>
        </>
    )
}