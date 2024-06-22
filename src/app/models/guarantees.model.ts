import { Loans } from "./loans.model";

export interface Guarantees {

    guaranteeid: number;
    loanid: Loans;
    guaranteetype: string;
    estimatedvalue?: number;
    description: string;
}


