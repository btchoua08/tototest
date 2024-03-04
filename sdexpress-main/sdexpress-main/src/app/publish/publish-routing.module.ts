import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishComponent } from './components/publish/publish.component';
import { CountryResolver } from './resolvers/countries.resolver';

const routes: Routes = [
  {path:'', component:PublishComponent, resolve: {
    countries: CountryResolver // Use the resolver here
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishRoutingModule { }
