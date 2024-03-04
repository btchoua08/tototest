import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeesService } from './services/employees.service';
import { SingleEmployeeComponent } from './components/single-employee/single-employee.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    SingleEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers: [
    EmployeesService
  ]
})
export class ReactiveStateModule { }
