import { Loans } from "./loans.model";

export interface Transactions {
    transactionid: number;
    loanid: number;
    amount: number;
    client_firstname: string;
    transactiondate: Date;
    transactiontype: string;
}
