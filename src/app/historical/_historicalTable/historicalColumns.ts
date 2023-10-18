import { Transaction } from "@/app/_common/models/transaction.class";
import { ColumnDef } from "@tanstack/react-table";

export const historicalColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: 'userId',
        header: 'Usuario',
    },
    {
        accessorKey: 'description',
        header: 'Descripción',
    }, {
        accessorKey: 'amount',
        header: 'Monto',
    }, {
        accessorKey: 'type',
        header: 'Tipo de transacción',
    }
];