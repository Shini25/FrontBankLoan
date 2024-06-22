import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

// page not found
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

// add
import { AddClientComponent } from './add/clients/clients.component';
import { AddEmployeeComponent } from './add/employees/employees.component';
import { AddLoanComponent } from './add/loans/loans.component'
import { AddGuaranteesComponent } from './add/guarantees/guarantees.component';
import { AddPaymentsComponent } from './add/payments/payments.component';
import { AddTransactionsComponent } from './add/transactions/transactions.component';

//lsit 
import { ListClientComponent } from './list/list-client/list-client.component';
import { ListEmployeeComponent } from './list/list-employee/list-employee.component';
import { ListLoanComponent } from './list/list-loan/list-loan.component';
import { ListGuaranteeComponent } from './list/list-guarantee/list-guarantee.component';
import { ListPaymentComponent } from './list/list-payment/list-payment.component';
import { ListTransactionComponent } from './list/list-transaction/list-transaction.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
    }, 
    {
        path: 'add-client',
        component: AddClientComponent
    },
    {
        path: 'add-employee',
        component: AddEmployeeComponent
    },
    {
        path: 'add-loan',
        component: AddLoanComponent
    },
    {
        path: 'add-guarantee',
        component: AddGuaranteesComponent
    },
    {
        path: 'add-payment',
        component: AddPaymentsComponent
    },
    {
        path: 'add-transaction',
        component: AddTransactionsComponent
    },
    // list
    {
        path: 'list-client',
        component: ListClientComponent
    },
    {
        path: 'list-employee',
        component: ListEmployeeComponent
    },
    {
        path: 'list-loan',
        component: ListLoanComponent
    },
    {
        path: 'list-guarantee',
        component: ListGuaranteeComponent
    },
    {
        path: 'list-payment',
        component: ListPaymentComponent
    },
    {
        path: 'list-transaction',
        component: ListTransactionComponent
    },
    {
        path: '**',
        component: PageNotFoundComponentComponent
    }

];
