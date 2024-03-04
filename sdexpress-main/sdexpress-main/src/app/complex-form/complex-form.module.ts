import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ComplexFormRoutingModule } from './complex-form-routing.module';
import { ComplexFormComponent } from './components/complex-form/complex-form.component';
import { ComplexFormService } from './services/complex-form.service';

@NgModule({
  declarations: [
    ComplexFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComplexFormRoutingModule
  ],
  providers: [
    ComplexFormService,
  ]
})
export class ComplexFormModule { }
