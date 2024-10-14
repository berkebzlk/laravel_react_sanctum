import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import ControlledInput from '../../../../components/layouts/ControlledInput'

const StokTanitimKartiDetail = () => {
    const [value, setValue] = React.useState('')

    return (
        <Box>
            Stok Tanitim karti detail
            <br></br>
            <Flex gap={5}>
                <Flex direction={"column"} gap={3}>
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                </Flex>
                <Flex direction={"column"} gap={3}>
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                    <ControlledInput align={"center"} justifyContent={"space-between"} value={value} setValue={setValue} />
                </Flex>
            </Flex>
        </Box>
    )
}

export default StokTanitimKartiDetail