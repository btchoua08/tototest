import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, map, Observable, switchMap, take, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeesService {
  baseUrl ="http://express.suitdesk.com/express/api"
  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable().pipe(
      delay(0)
    );
  }

  private _employees$ = new BehaviorSubject<Employee[]>([]);
  get employees$(): Observable<Employee[]> { return this._employees$.asObservable(); }

  private allEmployeesLastLoad!: number;

  constructor(private http: HttpClient) {}

  getEmployeesFromServer() {
    if (Date.now() - this.allEmployeesLastLoad <= 10000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Employee[]>('http://localhost:3000/candidates').pipe(
      delay(1000),
      tap(employees => {
        this.allEmployeesLastLoad = Date.now();
        this._employees$.next(employees);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getEmployeeById(id: number) {
    if (!this.allEmployeesLastLoad) {
      this.getEmployeesFromServer();
    }
    return this.employees$.pipe(
      map(employees => employees.filter(employee => employee.id === id)[0]),
    );
  }

  deleteEmployee(id: number) {
    this.setLoadingStatus(true);
    this.http.delete(`http://localhost:3000/candidates/${id}`).pipe(
      delay(1000),
      switchMap(() => this.employees$),
      take(1),
      map(employees => employees.filter(employee => employee.id !== id)),
      tap(employees => {
        this._employees$.next(employees);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  hireEmployee(id: number) {
    this.employees$.pipe(
      take(1),
      map(employees => {
        const employeeToUpdate = employees.filter(employee => employee.id === id)[0];
        const updatedEmployee = { ...employeeToUpdate, company: 'Suitdesk Ltd' };
        const updatedEmployees = employees.map(employee => employee.id === id ? updatedEmployee : employee);
        return { updatedEmployees, updatedEmployee };
      }),
      tap(({ updatedEmployees, updatedEmployee }) => this._employees$.next(updatedEmployees)),
      switchMap(({ updatedEmployee }) => this.http.patch(`http://localhost:3000/candidates/${id}`, updatedEmployee))
    ).subscribe();
  }
 
  
  private setLoadingStatus(status: boolean) {
    this._loading$.next(status);
  }
}
