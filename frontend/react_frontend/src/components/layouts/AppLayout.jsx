import { Box, Flex, HStack, Heading, Button, IconButton, List, Link, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue, useDisclosure, Collapse } from '@chakra-ui/react'
import { AiOutlineHome, AiOutlineSetting, AiOutlineUserSwitch, AiOutlineFolderOpen, AiOutlineUser, AiOutlineDashboard, AiOutlineTable } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import { BsCaretDownFill, BsCaretRightFill } from "react-icons/bs";

import { RiTodoLine } from 'react-icons/ri'
import { Outlet, NavLink } from 'react-router-dom'

import { BrandName } from "../../constants.js"
import axios from '../../axios.js'
import { useAuthStore } from '../../store/useAuthStore';
import ThemeToggle from './ThemeToggle.jsx'
import { useEffect, useState } from 'react'

const listItems = [
    {
        text: 'Home',
        href: '/',
        icon: AiOutlineHome,
        children: [
            {
                text: 'Dashboard',
                href: '/dashboard',
                icon: AiOutlineDashboard,
                children: [
                    {
                        text: 'Dashboard',
                        href: '/dashboard',
                        icon: AiOutlineDashboard,
                    },
                    {
                        text: 'Settings',
                        href: '/settings',
                        icon: AiOutlineSetting,
                        children: [
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
                        ]
                    },
                    {
                        text: 'Users',
                        href: '/users',
                        icon: AiOutlineUserSwitch,
                    },
                ]
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
        ]
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
    {
        text: 'Table',
        href: '/exampleTable',
        icon: AiOutlineTable,
    },
]

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

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('/menu');

                if (!response || !response.data) {
                    console.log('Menu data is empty');
                    return;
                }

                const menu = response.data;
                console.log('menu', menu);
                setMenu(menu);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMenu();
    }, [])

    const [openItems, setOpenItems] = useState({}); // Açık olan item'ların state'i

    const handleToggle = (id) => {
        setOpenItems(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Hangi item'ın açık olduğunu takip eder
        }));
    };

    const renderListItems = (items, isOpen) => {
        return items.map(item => {
            const isChildOpen = openItems[item.id]; // Her item için açılma durumu
            return (
                <List key={item.id}>
                    {item.route ? (
                        <Link
                            as={NavLink}
                            to={item.route + (item.meta_id !== "0" ? `/${item.meta_id}` : '')}
                            onClick={item?.children?.length > 0 ? () => handleToggle(item.id) : null}
                            _activeLink={{ fontWeight: "bold" }}
                        >
                            {isOpen ? (
                                <ListElement icon={item.icon} text={
                                    <>
                                        {item.name}
                                        {item?.children?.length > 0 ? (isChildOpen ? <BsCaretDownFill /> : <BsCaretRightFill />) : ''}
                                    </>
                                } />
                            ) : ''}
                        </Link>
                    ) : (
                        <div onClick={item?.children?.length > 0 ? () => handleToggle(item.id) : null}>

                            {isOpen ? (
                                <ListElement icon={item.icon} text={
                                    <>
                                        {item.name}
                                        {item?.children?.length > 0 ? (isChildOpen ? <BsCaretDownFill /> : <BsCaretRightFill />) : ''}
                                    </>
                                } />
                            ) : ''}
                        </div>
                    )
                    }

                    {item?.children && item?.children?.length > 0 && (
                        <Collapse in={isChildOpen}>
                            <List spacing={0} pl={4}>
                                {renderListItems(item.children, isOpen)}
                            </List>
                        </Collapse>
                    )}
                </List >
            );
        });
    };

    return (
        <>
            <title>Toggle Sidebar and Navbar Layout | {BrandName}</title>
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
                <Box as="aside" minH="90vh"  minW={isOpen ? 250 : 12} borderRight="2px" borderColor={useColorModeValue('gray.200', 'gray.900')} transition="width 0.25s ease">
                    <List spacing={0} p="0.5">
                        {
                            renderListItems(menu, isOpen)
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

const ListElement = ({ icon, text }) => {
    return (
        <ListItem
            as={HStack}
            spacing={0}
            minH="10"
            pl="2.5"
            cursor="pointer"
            _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
            rounded="md"
        >
            <ListIcon boxSize={5} as={icon} />
            {text && <Flex align="center" gap={2}>{text}</Flex>}
        </ListItem>
    )
}