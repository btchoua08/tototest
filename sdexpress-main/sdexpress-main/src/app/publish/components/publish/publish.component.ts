import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { PublishService } from '../../services/publish.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
 
  images : any = [];
    countries!:any[];
    cloneListOfTheme:any;
    flightTocketUrl!:string;
	  currentFile!: File;
    video:any;
    format:any;
    files:string  []  =  [];
    formData:any;
 
  loading = false;

  mainForm!: UntypedFormGroup;
  departureCountryCtrl!: UntypedFormControl;
  departureDateCtrl!: UntypedFormControl;
  destinationCountryCtrl!: UntypedFormControl;
  arrivalDateCtrl!: UntypedFormControl;
  flightTicketCtrl!: UntypedFormControl;
  numbreKiloCtrl!: UntypedFormControl;
  phoneNumberCtrl!: UntypedFormControl;
  pictureCtrl!: UntypedFormControl;
  passportCtrl!: UntypedFormControl;
  showPictureError$!: Observable<boolean>;
  showPassportError$!: Observable<boolean>;
  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;
  file_storePassport!: File | null;
  file_storePicture!: File | null;
  file_list: Array<string> = [];
  fileName = '';


  constructor( private _snackBar: MatSnackBar,
               private route: ActivatedRoute,
               private formBuilder: UntypedFormBuilder,
               private publishService: PublishService) { }

  ngOnInit(): void {
    this.countries = this.route.snapshot.data['countries'];
    this.countries =this.countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    this.initFormControls();
    this.initMainForm();
  }

  getSelectDepartureCountry(evt:UntypedFormControl){
    this.departureCountryCtrl=evt;
    console.log("valeur de evt departure:", this.departureCountryCtrl);
  }

  getSelectDestinationCountry(evt:UntypedFormControl){
    this.destinationCountryCtrl=evt;
    console.log("valeur de evt destination:", this.destinationCountryCtrl);
  }


  initFormControls() {
    this.departureDateCtrl = this.formBuilder.control('', { updateOn: 'blur' ,validators:Validators.required});
    this.arrivalDateCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.flightTicketCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.numbreKiloCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.numbreKiloCtrl.addValidators([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2)]);
    this.phoneNumberCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.phoneNumberCtrl.addValidators([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)]);

  }

  get f(){
    return this.mainForm.controls;
  }

  


  initMainForm() {
    this.mainForm = this.formBuilder.group({
      departureCountry: this.departureCountryCtrl,
      departureDate: this.departureDateCtrl,
      destinationCountry: this.destinationCountryCtrl,
      arrivalDate: this.arrivalDateCtrl,
      flightTicket: this.flightTicketCtrl,
      numbreKilo: this.numbreKiloCtrl,
      phoneNumber: this.phoneNumberCtrl
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmitForm() {
   this.loading = true;
    console.log("valeur de mainForm:",this.mainForm.value);
    this.publishService.savePublicationInfo(this.mainForm.value,this.flightTocketUrl).pipe(
      tap(response => {
        this.loading = false;
        if (response){
          this.mainForm.reset();
         this.openSnackBar("Publication successful","OK");
        }else{
          this.openSnackBar("Publication error","OK");
        }
       
      })
    ).subscribe();
  }

  getFormControlErrorText(ctrl: AbstractControl , text:string): string {
    if (ctrl.hasError('required')) {
      return 'This field is required';
    } else if (ctrl.hasError('email')) {
      return 'You must enter a valid e-mail address';
    } else if (ctrl.hasError('minlength') && text==='phone') {
      return 'Minlength 10';
    } else if (ctrl.hasError('maxlength') && text==='phone') {
      return 'Maxlength 10';
    
    } else if (ctrl.hasError('minlength') && text==='kilo') {
      return 'Minlength 2';
    } else if (ctrl.hasError('maxlength') && text==='kilo') {
      return 'Maxlength 2';
    }

      else {
      return 'This field is not valid';
    }
  }


  onFileFlightTicket(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.flightTicketCtrl.patchValue(event.target.files.item(0).name);
       this.currentFile = event.target.files.item(0);   
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                this.flightTocketUrl= event.target.result;  
              }
              reader.readAsDataURL(event.target.files[i]);
      }
  }
      
  }


 


  
}

