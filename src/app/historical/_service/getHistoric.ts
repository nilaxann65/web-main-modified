import { Transaction } from "@/app/_common/models/transaction.class";

export default async function getHistoric(): Promise<Transaction[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/financialHistory`, {
            method: 'GET',
        });
        if (!response.ok)
            throw new Error('Failed to fetch data for URL: /Incomes')

        return await response.json();
    } catch (e) {
        console.log(e)
        throw e
    }
}