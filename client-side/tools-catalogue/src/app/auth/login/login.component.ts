import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: any = FormGroup

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  get fc() {
    return this.form.controls
  }

  redirectToHome(): void {
    this.router.navigate(['/'])
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  onLogin() {
    if (this.form.invalid) { return }

    const fv = this.form.value;
    const username = fv.username;
    const password = fv.password;

    this.authService.login(username, password).subscribe
      (res => {
        localStorage.setItem(this.authService.tokenName, res.token)
        if (res.role === 'admin') {
          localStorage.setItem('role', res.role)
        }
        localStorage.setItem('userId', res._id)
        this.authService.isLogged()
        this.authService.isAdmin()
        this.redirectToHome(),
      (error: any) => console.log(error);
      })
  }



}
