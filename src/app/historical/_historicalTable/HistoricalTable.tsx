"use client"
import TableComponent from "@/app/_components/table/table.component";
import { historicalColumns } from "./historicalColumns";
import { Transaction } from "@/app/_common/models/transaction.class";
import { useEffect, useState } from "react";
import getHistoric from "../_service/getHistoric";

export default function HistoricalTable() {

    const [data, setData] = useState<Transaction[]>([])

    useEffect(() => {
        getHistoric().then((res) => {
            setData(res)
        }
        )
    }, [])
    return (
        <div>
            <TableComponent columns={historicalColumns} data={data} />
        </div>
    )
}