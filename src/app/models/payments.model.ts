import { Loans } from "./loans.model";

export interface Payments {
    paymentid: number;
    loanid: Loans;
    paymentamount: number;
    paymentdate: Date;
    paymenttype: string;
}

