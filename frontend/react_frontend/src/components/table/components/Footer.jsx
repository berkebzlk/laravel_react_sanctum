import { Button, ButtonGroup, Flex, Select, Text } from '@chakra-ui/react';
import React from 'react'

const TableFooter = ({table, pageSize, setPageSize}) => {
    return (
        <Flex align={"center"} h={"100%"} gap={3}>
            <Text>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
            </Text>
            <ButtonGroup size="sm" isAttached variant="outline">
                <Button
                    onClick={() => table.setPageIndex(0)}
                    isDisabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </Button>
                <Button
                    onClick={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </Button>
                <Button
                    onClick={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                >
                    {">"}
                </Button>
                <Button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    isDisabled={!table.getCanNextPage()}
                >
                    {">>"}
                </Button>
            </ButtonGroup>
            <Select w={200} value={pageSize} placeholder='Sayfa başına ürün' onChange={(e) => { setPageSize(Number(e.target.value)); table.setPageSize(Number(e.target.value)); }}>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
            </Select>
        </Flex>)
}

export default TableFooter