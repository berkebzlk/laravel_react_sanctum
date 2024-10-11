import React, { useEffect, useState } from "react";
import { Box, Icon, Input, Menu, MenuList, MenuOptionGroup, Select, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, MenuItemOption, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Checkbox, Tfoot } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "../../data";
import SortIcon from "../../components/table/icons/SortIcon";
import { createColumns } from "../../helper";
import { unwantedColumns } from './unwantedColumns';
import { ColumnVisibilityFilter, DefaultColumnFilter, TableFooter } from "../../components/table/components";

const ExampleTable = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pageSize, setPageSize] = useState(20);

  let columns = createColumns(DATA);
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
    enableColumnResizing: true,
    columnResizeMode: 'onChange'
  });

  useEffect(() => {
    const allColumns = table.getAllColumns().reduce((acc, column) => {
      acc[column.id] = true;
      return acc;
    }, {});
    setColumnVisibility(allColumns);
  }, [table]);

  const handleColumnVisibilityChange = (columnId) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <TableContainer p={5}>
      <Box mb={4}>
        <ColumnVisibilityFilter table={table} handleColumnVisibilityChange={handleColumnVisibilityChange} />
      </Box>

      <Box h={700} maxH={700} overflowY={"auto"}>
        <Table mb={4}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                <Tr key={`${headerGroup.id}-input`}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th w={header.getSize()} key={`${header.id}-input`}>
                        <DefaultColumnFilter id={header.id} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                      </Th>
                    )
                  })}
                </Tr>
                <Tr key={`${headerGroup.id}-header`}>
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

    </TableContainer>
  );
};
export default ExampleTable;
