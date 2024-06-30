import { Loans } from "./loans.model";

export interface Guarantees {

    guaranteeid: number;
    loanid: number;
    guaranteetype: string;
    estimatedvalue?: number;
    description: string;
}


