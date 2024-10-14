import { Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'

const ControlledInput = ({value, setValue, w="400px", inpW="300px", placeholder="", size="sm", ...props}) => {
  
  return (
    <Flex w={w} {...props}>
      <Text>Value: {value}</Text>
      <Input
        w={inpW}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        size={size}
      />
    </Flex>
  )
}

export default ControlledInput