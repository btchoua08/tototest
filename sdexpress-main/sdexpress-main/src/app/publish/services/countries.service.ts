import { Injectable } from '@angular/core';
import { delay, Observable, of,map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  env = environment ;

  constructor(private http: HttpClient) {}

      getCountries(): Observable<any[]> {
        return this.http.get<any[]>(this.env.countryUrl).pipe();
      }
      
}
