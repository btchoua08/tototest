import { Component, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loading$!: Observable<boolean>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loading$ = this.router.events.pipe(
      filter(event => event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel),
      map(event => event instanceof NavigationStart)
    );
  }

}
