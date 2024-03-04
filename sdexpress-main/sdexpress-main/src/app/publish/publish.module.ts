import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishRoutingModule } from './publish-routing.module';
import { PublishComponent } from './components/publish/publish.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PublishService } from './services/publish.service';
import { CountriesService } from './services/countries.service';


@NgModule({
  declarations: [
    PublishComponent
  ],
  imports: [
    CommonModule,
    PublishRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PublishService,
    CountriesService,
  ]
  
})
export class PublishModule { }
