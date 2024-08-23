import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  errorMsg:string = ''



  loginForm:FormGroup = this._FormBuilder.group({
    email : [null , [Validators.required , Validators.email]],
    password : [null , [Validators.required , Validators.pattern(/^[a-zA-Z0-9]{4,}$/)]],
  })

  login(){

    this._AuthService.login(this.loginForm.value).subscribe({
      next: (res)=>{
        console.log(res);
        localStorage.setItem('token' , res.token)
        this._Router.navigate(['/home'])
      },
      error: (err)=>{
        this.errorMsg = err.error.msg
        
      }
    })
  }
}
