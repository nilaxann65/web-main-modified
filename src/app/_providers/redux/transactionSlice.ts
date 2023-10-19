import { Transaction } from "@/app/_common/models/transaction.class";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const transactionSlice = createSlice({
    name: "transactions",
    initialState: [] as Transaction[],
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            const payload: Transaction = action.payload;
            state.push(payload);
        },
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            const payload: Transaction[] = action.payload;
            state = payload;
        }
    }
});
export const selectTransactions = (state: RootState) => state.transactions.values();

export const { addTransaction, setTransactions } = transactionSlice.actions;