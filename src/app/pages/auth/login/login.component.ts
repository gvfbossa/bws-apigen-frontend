import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  successLogin!: boolean
  errorLogin!: boolean

  loading = false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    const payload = {
      email,
      password,
      machineHash: null,
    };

    this.loading = true

    this.auth.login(payload).subscribe({
      next: (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        
        this.successLogin = true
        this.errorLogin = false
        this.loading = false
        
        setTimeout(() => {
          this.router.navigate(['/dashboard'])
        }, 3000);
      },
      error: (err) => {
        this.loading = false
        this.errorLogin = true
        this.successLogin = false
      },
    });
  }

}