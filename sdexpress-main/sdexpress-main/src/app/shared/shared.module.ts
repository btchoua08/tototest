import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { CountryListComponent } from './components/country-list/country-list.component';

@NgModule({
  declarations: [
    CommentsComponent,
    CountryListComponent,
    TimeAgoPipe,
    HighlightDirective,
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommentsComponent,
    CountryListComponent,
    LoadingOverlayComponent,
    ReactiveFormsModule,
    MaterialModule,
    TimeAgoPipe,
    HighlightDirective,
    HttpClientModule
  ]
})
export class SharedModule {
}
