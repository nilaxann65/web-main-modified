"use client";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

type props = {
    columns: ColumnDef<any>[],
    data: any[]
}
export default function TableComponent({
    columns,
    data
}: props) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => {
                                        return (
                                            <TableCell key={header.id}>
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableHead>
                <TableBody>
                    {
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {
                                                    flexRender(cell.column.columnDef.cell,
                                                        cell.getContext())
                                                }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    No existen más datos
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>
                            <Button
                                onClick={() => table.previousPage()}
                            >
                                {"<"}
                            </Button>
                            <Button
                                onClick={() => table.nextPage()}
                            >{">"}</Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}