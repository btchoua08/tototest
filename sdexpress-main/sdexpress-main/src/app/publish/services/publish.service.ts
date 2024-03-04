import { Injectable } from '@angular/core';
import { PublishFormValue } from '../models/publish-form-value.model';
import { catchError, delay, mapTo, Observable, of } from 'rxjs';
import {HttpClient ,HttpHeaders,HttpResponse, HttpEventType, HttpRequest, HttpEvent} from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { environment } from '../../../environments/environment';
@Injectable()
export class PublishService {

    env = environment ;
 
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: PublishFormValue,pictureUrl:string,passportUrl:string): Observable<boolean> {

    let headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    let url ='users/createUser.php';
    let postVars =null; 
    let combination = formValue.loginInfo.password +''+formValue.email.email;
    const pass = bcrypt.hashSync(combination, "$2a$10$1VROJoJts4K7MazAu1Oomu");
       postVars = JSON.stringify({
        email : formValue.email.email,
        password : pass,
        firstName: formValue.personalInfo.firstName,
        lastName: formValue.personalInfo.lastName,
        status: 1,
        activation:1,
        pictureName:formValue.pictureName,
        passportName:formValue.passportName,
        pictureValue:pictureUrl,
        passportValue:passportUrl,
        role:2,
      });
      console.log('postVars:',postVars);
    return this.http.post(`${this.env.baseUrl}${url}`, postVars,{headers: headers}).pipe(
      mapTo(true),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }

  savePublicationInfo(formValue: PublishFormValue,flightTocketUrl:string): Observable<boolean> {

    let headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    let url ='users/createPublication.php';
    let postVars =null; 
       postVars = JSON.stringify({
        email : formValue.email.email,
        firstName: formValue.personalInfo.firstName,
        lastName: formValue.personalInfo.lastName,
        status: 1,
        activation:1,
        pictureName:formValue.pictureName,
        passportName:formValue.passportName,
        flightTocketUrl:flightTocketUrl
      });
      console.log('postVars:',postVars);
    return this.http.post(`${this.env.baseUrl}${url}`, postVars,{headers: headers}).pipe(
      mapTo(true),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }


  uploadFile(file: File,url:string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.env.baseUrl}${url}`, formdata, {
        reportProgress: true,
        responseType: 'text'
    });
  
    return this.http.request(req);
   }
}
