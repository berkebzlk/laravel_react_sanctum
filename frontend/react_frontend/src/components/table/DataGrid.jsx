import React, { useEffect, useState } from "react";
import { Box, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import SortIcon from "../../components/table/icons/SortIcon";
import { createColumns } from "../../helper";
import { ColumnVisibilityFilter, DefaultColumnFilter, TableFooter } from "../../components/table/components";

const ExampleTable = ({ data, unwantedColumns }) => {

    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [pageSize, setPageSize] = useState(20);

    // Create columns and filter unwanted columns
    let columns = createColumns(data);
    columns = columns.filter(column => {
        return !unwantedColumns.includes(column.accessorKey)
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            columnVisibility
        },
        initialState: {
            pagination: {
                pageSize: pageSize,
            },
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableColumnResizing: false,
    });


    // secilecek kolonların popup yapılandırılması
    useEffect(() => {
        try {
            const allColumns = table.getAllColumns().reduce((acc, column) => {
                acc[column.id] = true;
                return acc;
            }, {});
            setColumnVisibility(allColumns);
        } catch (error) {
            console.error(error);
        }
    }, [table]);

    const handleColumnVisibilityChange = (columnId) => {
        setColumnVisibility((prev) => ({
            ...prev,
            [columnId]: !prev[columnId],
        }));
    };

    return (
        <TableContainer>
            <Box mb={4}>
                <ColumnVisibilityFilter table={table} handleColumnVisibilityChange={handleColumnVisibilityChange} />
            </Box>

            <Box h={700} maxH={700} overflowY={"scroll"} maxW={"100rem"} overflowX={"scroll"}>
                <Table mb={4}>
                    <Thead position="sticky" bg={useColorModeValue('gray.300', 'gray.800')} top={0} zIndex="1">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <React.Fragment key={headerGroup.id}>
                                <Tr key={`${headerGroup.id}-input`}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <Th borderBottom={"none"} w={header.getSize()} key={`${header.id}-input`}>
                                                <DefaultColumnFilter column={header.column} />
                                            </Th>
                                        )
                                    })}
                                </Tr>
                                <Tr borderTop={"none"} key={`${headerGroup.id}-header`}>
                                    {headerGroup.headers.map((header) => (
                                        <Th w={header.getSize()} key={`${header.id}-header`}>
                                            {header.column.columnDef.header}
                                            {header.column.getCanSort() && (
                                                <Icon
                                                    as={SortIcon}
                                                    mx={3}
                                                    fontSize={14}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                />
                                            )}
                                            {
                                                {
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[header.column.getIsSorted()]
                                            }
                                            <Box
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                            />
                                        </Th>
                                    ))}
                                </Tr>
                            </React.Fragment>

                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => {

                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td w={cell.column.getSize()} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Td>
                                    ))}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Box>
            <TableFooter table={table} pageSize={pageSize} setPageSize={setPageSize} />
            {/* <pre>
                {JSON.stringify(
                    { columnFilters: table.getState().columnFilters },
                    null,
                    2
                )}
            </pre> */}
        </TableContainer>
    );
};
export default ExampleTable;
