import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap, take, tap } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleEmployeeComponent implements OnInit {

  loading$!: Observable<boolean>;
  employee$!: Observable<Employee>;
  employeeId$!: Observable<number>;

  constructor(private employeesService: EmployeesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loading$ = this.employeesService.loading$;
    this.initObservables();
  }

  initObservables() {
    this.employee$ = this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => this.employeesService.getEmployeeById(id)),
      filter(employee => !!employee),
      take(1),
      shareReplay(1)
    );
    this.employeeId$ = this.employee$.pipe(
      map(employee => employee.id)
    );
  }

  onGoBack() {
    this.router.navigateByUrl('/travelers/users');
  }

  onRefuse() {
    this.employeeId$.pipe(
      tap(id => {
        this.employeesService.deleteEmployee(id);
        this.onGoBack();
      })
    ).subscribe();
  }

  onHire() {
    this.employeeId$.pipe(
      tap(id => {
        console.log('here');
        this.employeesService.hireEmployee(id);
        this.onGoBack();
      })
    ).subscribe();
  }
}
