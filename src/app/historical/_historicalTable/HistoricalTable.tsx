"use client"
import { useState, useEffect } from "react";
import TableComponent from "@/app/_components/table/table.component";
import { historicalColumns } from "./historicalColumns";
import { Transaction } from "@/app/_common/models/transaction.class";
import getHistoric from "../_service/getHistoric";
import { InvoiceType } from "@/app/_common/enum/invoiceType";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function HistoricalTable() {
    const [data, setData] = useState<Transaction[]>([]);
    const [filteredData, setFilteredData] = useState<Transaction[]>([]);
    const [selectedType, setSelectedType] = useState("Todo");

    useEffect(() => {
        getHistoric().then((res) => {
            setData(res)
            setFilteredData(res)
        });
    }, []);

    const handleTypeChange = (event: any) => {
        setSelectedType(event.target.value as string ?? "Todo");
        setFilteredData(data.filter((transaction) => transaction.type === event.target.value || event.target.value === "Todo"));
    };

    return (
        <div>
            <div>
                <FormControl>
                    <Select
                        labelId="typeFilter-label"
                        id="typeFilter"
                        value={selectedType}
                        onChange={e => handleTypeChange(e)}
                        sx={{ minWidth: 120 }}
                        size="small"
                    >
                        <MenuItem value="Todo">Todo</MenuItem>
                        <MenuItem value={InvoiceType.Income}>Ingreso</MenuItem>
                        <MenuItem value={InvoiceType.Expense}>Gasto</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TableComponent columns={historicalColumns} data={filteredData} />
        </div>
    );
}