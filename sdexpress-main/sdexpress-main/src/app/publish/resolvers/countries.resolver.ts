import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CountriesService } from '../services/countries.service';

@Injectable({
  providedIn: 'root'
})
export class CountryResolver implements Resolve<any[]> {

  constructor(private countries: CountriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.countries.getCountries();
  }
}
