import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent {

  @Input() countries!: any[];
  @Input() title!:string;
  @Input() countryCtrl!: UntypedFormControl;
  @Output() selectCountry = new EventEmitter<UntypedFormControl>();
 


  constructor(private formBuilder: UntypedFormBuilder) { }


  onSelected(): void {
    this.selectCountry.emit(this.countryCtrl);
  }

  ngOnInit(): void {
    console.log
    this.countryCtrl = this.formBuilder.control('', { updateOn: 'blur' , validators:[Validators.required]});
  }

}
