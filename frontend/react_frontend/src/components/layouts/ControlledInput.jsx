import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'

const ControlledInput = ({ label, ref, value, onChange, name, inpW="300px", placeholder="", size="sm", ...props}) => {
  
  return (
    <Box {...props}>
      <Text fontSize={"sm"} >{label}</Text>
      <Input
        w={'100%'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        name={name}
        ref={ref}
      />
    </Box>
  )
}

export default ControlledInput