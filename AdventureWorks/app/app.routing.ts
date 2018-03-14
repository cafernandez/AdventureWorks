import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './components/employee.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    { path: 'employee', component: EmployeeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);