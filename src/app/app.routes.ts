import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddClientComponent } from './add/clients/clients.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AddEmployeeComponent } from './add/employees/employees.component';
import { AddLoanComponent } from './add/loans/loans.component'
import { AddGuaranteesComponent } from './add/guarantees/guarantees.component';

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
        path: '**',
        component: PageNotFoundComponentComponent
    }

];
