import { Clients } from "./clients.model";

export interface Loans {
    loanid: number;
    clientid: Clients;
    amount: number;
    interestrate: number;
    durationmonths: number;
    startdate: Date;
    loantype: string;
    status: string;
}
