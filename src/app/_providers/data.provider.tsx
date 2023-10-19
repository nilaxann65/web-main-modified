"use client";
import { useEffect } from "react";
import getHistoric from "../historical/_service/getHistoric";
import { setTransactions } from "./redux/transactionSlice";
import { useAppDispatch } from "./redux/hooks";

export default function DataProvider({
    children
}: {
    children: React.ReactNode
}) {
    const dispatcher = useAppDispatch();

    useEffect(() => {
        getHistoric().then(reponse => {
            console.log(reponse);
            dispatcher(setTransactions(reponse))
        })
    }, [])

    return (
        <>
            {children}
        </>
    );
}