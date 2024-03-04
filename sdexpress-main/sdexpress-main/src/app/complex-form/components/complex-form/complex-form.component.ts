import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss'],
})
export class ComplexFormComponent implements OnInit {
 
  images : any = [];
    countries: any = [];
    cloneListOfTheme:any;
    passportUrl!:string;
    pictureUrl!:string;
	  currentFile!: File;
    video:any;
    format:any;
    files:string  []  =  [];
    formData:any;
 
  loading = false;
  mainForm!: UntypedFormGroup;
  personalInfoForm!: UntypedFormGroup;
  emailForm!: UntypedFormGroup;
  emailCtrl!: UntypedFormControl;
  confirmEmailCtrl!: UntypedFormControl;
  phoneCtrl!: UntypedFormControl;
  loginInfoForm!: UntypedFormGroup;
  passwordCtrl!: UntypedFormControl;
  confirmPasswordCtrl!: UntypedFormControl;
  pictureInfoForm!: UntypedFormGroup;
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
               private formBuilder: UntypedFormBuilder,
               private complexFormService: ComplexFormService) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initFormObservables();
    this.initMainForm();
  }

  initFormControls() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
   
    this.emailCtrl = this.formBuilder.control('', { updateOn: 'blur' , validators:[Validators.required, Validators.email]});
    this.confirmEmailCtrl = this.formBuilder.control('', { updateOn: 'blur' ,validators:Validators.required});
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    },{ validators: confirmEqualValidator('email', 'confirm') });
    this.phoneCtrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.confirmPasswordCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
   
    this.loginInfoForm = this.formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, { validators: confirmEqualValidator('password', 'confirmPassword') });
 
    this.pictureCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.passportCtrl = this.formBuilder.control('', { validators: Validators.required, updateOn: 'blur' });
    this.pictureInfoForm = this.formBuilder.group({
      picture: this.pictureCtrl,
      passport: this.passportCtrl,
    });
  
  }

  get f(){
    return this.mainForm.controls;
  }

  
     
 
  initFormObservables() {
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || !this.emailCtrl.touched || !this.emailForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    );
    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || !this.passwordCtrl.touched || !this.loginInfoForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    )

    this.showPictureError$ = this.pictureInfoForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || !this.pictureCtrl.touched || !this.pictureInfoForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    )

    this.showPassportError$ = this.pictureInfoForm.statusChanges.pipe(
      map(status => {
        if (status !== 'INVALID' || !this.passportCtrl.touched || !this.pictureInfoForm.hasError('valuesNotEqual')) {
          return false;
        }
        return true;
      })
    )

  }

  initMainForm() {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
      pictureName: this.pictureCtrl,
      passportName: this.passportCtrl
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmitForm() {
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value,this.pictureUrl,this.passportUrl).pipe(
      tap(response => {
        this.loading = false;
        if (response){
          this.mainForm.reset();
         this.openSnackBar("Register successful","OK");
        }else{
          this.openSnackBar("Register error","OK");
        }
       
      })
    ).subscribe();
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

  onFileChangePicture(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.pictureCtrl.patchValue(event.target.files.item(0).name);
       this.currentFile = event.target.files.item(0);   
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                 this.pictureUrl = event.target.result;
              }
              reader.readAsDataURL(event.target.files[i]);
      }
  }
      
  }


  onFileChangePassport(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.passportCtrl.patchValue(event.target.files.item(0).name);
       this.currentFile = event.target.files.item(0);   
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                this.passportUrl= event.target.result;  
              }
              reader.readAsDataURL(event.target.files[i]);
      }
  }
      
  }


 


  
}
