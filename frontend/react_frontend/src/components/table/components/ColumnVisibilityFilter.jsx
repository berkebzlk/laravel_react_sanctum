import { Button, Checkbox, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack } from '@chakra-ui/react'
import React from 'react'

const ColumnVisibilityFilter = ({table, handleColumnVisibilityChange}) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button>
                    Kolonları Seç
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Kolonları Seç</PopoverHeader>
                <PopoverBody >
                    <Stack>
                        {table.getAllColumns().map((column) => (
                            <Checkbox
                                key={column.id}
                                isChecked={column.getIsVisible()}
                                onChange={() => handleColumnVisibilityChange(column.id)}
                            >
                                {column.id}
                            </Checkbox>
                        ))}
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default ColumnVisibilityFilter