import { Typography } from "@mui/material";
import HistoricalTable from "./_historicalTable/HistoricalTable";

export default function HistoricalPage() {
    return (
        <div>
            <Typography variant="h3">Historico</Typography>
            <HistoricalTable />
        </div>
    )
}