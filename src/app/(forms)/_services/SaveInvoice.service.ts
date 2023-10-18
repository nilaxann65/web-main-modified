import { InvoiceType } from "@/app/_common/enum/invoiceType"
import { Transaction } from "../../_common/models/transaction.class"

export default async function SaveInvoice(
    formData: Transaction,
    type: InvoiceType
): Promise<any> {
    try {
        console.log(formData)
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/financialHistory`
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                type,
            })
        })
        if (!response.ok) {
            throw new Error('Failed to fetch data for URL: /Incomes')
        }
        return await response.json()
    } catch (e) {
        console.log(e)
        throw e
    }
}
