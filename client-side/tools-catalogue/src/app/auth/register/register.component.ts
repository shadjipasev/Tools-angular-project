import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sameValueValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  isSubmited = false;

  // this.form = this.fb.group({
  //   username:['', Validators.required],
  //   email:['', [Validators.required, Validators.email]],
  //   pass: this.fb.group({
  //     password:['', Validators.required],
  //     rePass:['', Validators.required],
  //   }, {
  //     validators: [Validators.minLength(5)]
  //   })
  // });

  get fc(){
    return this.form.controls
  }
 
  ngOnInit(): void {
    this.form = this.fb.group({
      username:['', Validators.required],
      email:['', Validators.compose([Validators.required, Validators.email])],
      pass: this.fb.group({
            password:['', Validators.required],
            rePass:['', Validators.required],
          }, {
            validators: [Validators.minLength(5)]
          })
    })
  }


  onRegister(data:any){
    this.isSubmited = true;
    if(this.form.invalid) { return }
    const fv  = this.form.value;

    const user: any = {
      username: fv.username,
      email: fv.email,
      password: fv.pass.password,
    }
    // const {username, email, pass} = this.form.values
    this.authService.register(user.username, user.email, user.password)
      .subscribe(res => console.log(res))
      console.warn(user)
  }

}
