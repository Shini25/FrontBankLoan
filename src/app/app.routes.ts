import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

// page not found
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

// add
import { AddClientComponent } from './add/clients/clients.component';
import { AddEmployeeComponent } from './add/employees/employees.component';
import { AddLoanComponent } from './add/loans/loans.component';
import { AddGuaranteesComponent } from './add/guarantees/guarantees.component';
import { AddTransactionsComponent } from './add/transactions/transactions.component';

// list
import { ListClientComponent } from './list/list-client/list-client.component';
import { ListEmployeeComponent } from './list/list-employee/list-employee.component';
import { ListLoanComponent } from './list/list-loan/list-loan.component';
import { ListGuaranteeComponent } from './list/list-guarantee/list-guarantee.component';
import { ListTransactionComponent } from './list/list-transaction/list-transaction.component';
import { HomeComponent } from './home/home.component';

//auth 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'list-client',
        component: ListClientComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'list-employee',
        component: ListEmployeeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'list-loan',
        component: ListLoanComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'list-guarantee',
        component: ListGuaranteeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'list-transaction',
        component: ListTransactionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-client',
        component: AddClientComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-employee',
        component: AddEmployeeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-loan',
        component: AddLoanComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-guarantee',
        component: AddGuaranteesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'add-transaction',
        component: AddTransactionsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        component: PageNotFoundComponentComponent
    },
];