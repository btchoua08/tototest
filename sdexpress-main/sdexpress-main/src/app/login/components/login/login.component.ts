import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


	  currentFile!: File;
    video:any;
    format:any;
    files:string  []  =  [];
    formData:any;
 
  loading = false;
  mainForm!: UntypedFormGroup;
  personalInfoForm!: UntypedFormGroup;
  emailCtrl!: UntypedFormControl;
  confirmEmailCtrl!: UntypedFormControl;
  loginInfoForm!: UntypedFormGroup;
  passwordCtrl!: UntypedFormControl;
  showPasswordError$!: Observable<boolean>;
  showEmailCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;

  constructor( 
               private formBuilder: UntypedFormBuilder,
              ) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initFormObservables();
    this.initMainForm();
  }

  initFormControls() {
    this.emailCtrl = this.formBuilder.control('', { updateOn: 'blur' , validators:[Validators.required, Validators.email]});
    this.passwordCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.personalInfoForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });

  }
  get f(){
    return this.mainForm.controls;
  }
  initFormObservables() {
    this.showEmailError$ = this.personalInfoForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || !this.emailCtrl.touched || !this.personalInfoForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    );
    this.showPasswordError$ = this.personalInfoForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || !this.passwordCtrl.touched || !this.personalInfoForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    )

  }

  initMainForm() {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
    });
  }

  onSubmitForm() {
    this.loading = true;
  }

  getErrorMessage(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'This field is required';
    } else if (ctrl.hasError('email')) {
      return 'You must enter a valid e-mail address';
    }  else {
      return 'This field is not valid';
    }
  }


 

  
}

