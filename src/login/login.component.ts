import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
      if (this.authService.validateUser(this.loginForm.controls['username']?.value, this.loginForm.controls['password']?.value)) {
        this.router.navigate(this.loginForm.controls['username']?.value === 'admin' ? ['/admin']: ['/user']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }

}

