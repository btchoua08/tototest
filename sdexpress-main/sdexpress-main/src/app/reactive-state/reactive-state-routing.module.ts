import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SingleEmployeeComponent } from './components/single-employee/single-employee.component';

const routes: Routes = [
  { path: 'users', component: EmployeeListComponent },
  { path: 'users/:id', component: SingleEmployeeComponent },
  { path: '**', pathMatch:'full',redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
