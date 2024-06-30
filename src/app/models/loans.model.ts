export interface Loans {
    loanid: number;
    clientid: number;
    client_firstname: string;
    client_lastname: string;
    client_email: string;
    client_phone: string;
    client_address: string;
    client_birthdate: Date;
    client_balance: number;
    amount: number;
    interestrate: number;
    remaining_amount: number;
    durationmonths: number;
    startdate: Date;
    loantype: string;
    status: string;
  }