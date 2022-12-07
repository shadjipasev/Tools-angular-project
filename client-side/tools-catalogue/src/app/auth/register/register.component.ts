import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { sameValueValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // : FormGroup;


  isSubmited = false;

  form = this.fb.group({
    username:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    pass: this.fb.group({
      password:['', Validators.required],
      rePass:['', Validators.required],
    }, {
      validators: [Validators.minLength(5)]
    })
  });

  get fc(){
    return this.form.controls
  }
 
  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onRegister(){
    this.isSubmited = true;
    if(this.form.invalid) { return }
    const {username, email, pass: { password, rePass} = {}} = this.form.value;
    this.authService.register(username!, email!, password!, rePass!)
      .subscribe(res => console.log(res))
      console.warn(this.form.value)
  }

}
