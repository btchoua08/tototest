export class ComplexFormValue {
  personalInfo!: {
    firstName: string,
    lastName: string
  };
  contactPreference!: string;
  email!: {
    email: string,
    confirm: string
  };
  pictureName!:string;
  passportName!:string;
  pictureValue!:File;
  passportValue!: File;
  loginInfo!: {
    username: string,
    password: string,
    confirmPassword: string,
  };
}
