import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { sign } from 'crypto';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  errorMsg:any


  signupForm:FormGroup = this._FormBuilder.group({
    name : [null , [Validators.required , Validators.minLength(3)]],
    email : [null , [Validators.required , Validators.email]],
    password : [null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9]{4,}$/)]],
    age : [null , [Validators.required , Validators.min(20)]],
    phone : [null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/gm)]],
  })

  signup(){

    if(this.signupForm.valid){
      this._AuthService.signup(this.signupForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._Router.navigate(['/login'])
        },
        error:(err)=>{
          this.errorMsg =err.error.msg
          console.log(this.errorMsg);
          
        }
      })
    }
  }
}
