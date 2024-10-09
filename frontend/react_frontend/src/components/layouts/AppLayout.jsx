import { Avatar, Box, Button, Flex, HStack, Heading, IconButton, List, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { AiOutlineHome, AiOutlineSetting, AiOutlineUserSwitch, AiOutlineFolderOpen, AiOutlineUser, AiOutlineDashboard } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import { RiTodoLine } from 'react-icons/ri'
import { IoEarthOutline } from 'react-icons/io5'
import { Outlet, NavLink } from 'react-router-dom'

import PreviewOptionsNavbar from './PreviewOptionsNavbar'
import { BrandName } from "../../constants.js"
import axios from '../../axios.js'
import { useAuthStore } from '../../store/useAuthStore';

const listItems = [
    {
        text: 'Home',
        href: '/',
        icon: AiOutlineHome,
    },
    {
        text: 'Dashboard',
        href: '/dashboard',
        icon: AiOutlineDashboard,
    },
    {
        text: 'Settings',
        href: '/settings',
        icon: AiOutlineSetting,
    },
    {
        text: 'Users',
        href: '/users',
        icon: AiOutlineUserSwitch,
    },
    {
        text: 'Tasks',
        href: '/tasks',
        icon: RiTodoLine,
    },
    {
        text: 'Folder',
        href: '/folder',
        icon: AiOutlineFolderOpen,
    },
]

export default function NavSidebar() {
    const { getButtonProps, isOpen } = useDisclosure()
    const buttonProps = getButtonProps()
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        await axios.get('/test', {}, {
            withCredentials: true,
          });

        logout();
    }

    return (
        <>
            <title>Toggle Sidebar and Navbar Layout | {BrandName}</title>
            <PreviewOptionsNavbar />
            <Flex as="nav" alignItems="center" justifyContent="space-between" h='16' py='2.5' pr="2.5">
                <HStack spacing={2}>
                    <IconButton {...buttonProps} _active='none' _focus='none' _hover='none' fontSize="18px" variant='ghost' icon={<BiMenu />} aria-label='open menu' />
                    <Heading as='h1' size="md">{BrandName}</Heading>
                </HStack>
                <HStack spacing="1">

                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                isRound={true}
                                size="lg"
                                aria-label="user icon"
                                icon={<AiOutlineUser />} // İkon burada yer alıyor
                            />
                            <MenuList>
                                <MenuItem><NavLink to={"/profile"}>Profile</NavLink></MenuItem>
                                <MenuItem onClick={handleLogout}><NavLink to={"#"}>Logout</NavLink></MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Flex>
            <HStack align="start" spacing={0}>
                <Box as="aside" minH="90vh" w={isOpen ? 72 : 12} borderRight="2px" borderColor={useColorModeValue('gray.200', 'gray.900')} transition="width 0.25s ease">
                    <List spacing={0} p="0.5">
                        {
                            listItems.map(item => (<NavLink key={item.href} to={item.href}><ListElement icon={item.icon} text={isOpen ? item.text : ''} /></NavLink>))
                        }
                    </List>
                </Box>
                <Flex as="main" w='full' pl={10} pr={10} minH="90vh" align="start" justify="start" bg={useColorModeValue('gray.50', 'gray.900')}>
                    <Box mt={10}>
                        {/* <Heading as='h3'>Main Heading</Heading>
                        <Text>Empty Main Content</Text> */}
                        <Outlet />
                    </Box>
                </Flex>
            </HStack>
        </>
    )
}

const ListElement = ({ icon, text }) => {
    return (
        <ListItem as={HStack} spacing={0} h="10" pl="2.5" cursor="pointer" _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }} rounded="md">
            <ListIcon boxSize={5} as={icon} />
            {
                text && <Text>{text}</Text>
            }
        </ListItem>
    )
}