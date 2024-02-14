import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = FormGroup;

  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  

  ) {}

  get fc() {

    return this.form.controls;
    
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(5)]],
          rePass: ['', [Validators.required, Validators.minLength(5)]],
        },
        // [Validators, this.matchPasswords('pass', 'rePass')]
      ),
    });
  }

  // private matchPasswords(password: string, rePass: string): ValidatorFn {

  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const formGroup = control as FormGroup;
  //     const passControl = formGroup.get(password)?.value;
  //     const rePassControl = formGroup.get(rePass)?.value;
  //     console.log("Works")

  //     if (true) {
  //       return null;
  //     }
  //   };
  // }

  redirectToHome(): void {
      console.log("Works")

    this.router.navigate(['/']);
  }

  onRegister(data: any) {
      console.log("Works")

    if (this.form.invalid) {
      return;
    }
    const fv = this.form.value;

    const username = fv.username;
    const email = fv.email;
    const password = fv.pass.password;

    this.authService.register(username, email, password).subscribe((res) => {
      console.log("works")
      console.log(res);
      localStorage.setItem(this.authService.tokenName, res.token);
      localStorage.setItem('userId', res._id);
      this.authService.isLogged();
      this.authService.isAdmin();
      this.redirectToHome(), (error: any) => console.log(error);
    });
  }
}
