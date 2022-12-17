import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sameValueValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }


  get fc(){
    return this.form.controls
  }

 
  ngOnInit(): void {
    this.form = this.fb.group({
      username:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      pass: this.fb.group({
            password:['', [Validators.required, Validators.minLength(5)]],
            rePass:['', [Validators.required, Validators.minLength(5)]],
          })
    })
  }

  redirectToHome(): void {
    this.router.navigate(['/'])
  }

  onRegister(data:any){
    if(this.form.invalid) { return }
      const fv  = this.form.value;

      const username = fv.username;
      const email = fv.email;
      const password = fv.pass.password;
  
    this.authService.register(username, email, password).subscribe(res => {
      console.log(res);
      localStorage.setItem(this.authService.tokenName, res.token);
      this.authService.isLogged()
      this.authService.isAdmin()
    })
    this.redirectToHome()
  }

}
