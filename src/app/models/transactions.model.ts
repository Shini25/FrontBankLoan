import { Clients } from "./clients.model";
import { Loans } from "./loans.model";

export interface Transactions {
    transactionid: number;
    clientid: Clients;
    loanid: Loans;
    amount: number;
    date: Date;
    type: string;
}