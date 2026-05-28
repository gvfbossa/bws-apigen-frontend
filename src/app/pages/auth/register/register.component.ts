import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RegisterStripeComponent } from "../../shared/register-stripe/register-stripe.component";
import { TermsModalComponent } from "../../shared/terms-modal/terms-modal.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegisterStripeComponent,
    TermsModalComponent
  ],
})
export class RegisterComponent implements OnInit {
  @ViewChild('stripeCard') stripeCard!: RegisterStripeComponent;

  // Campos do form
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  nameError = false
  emailError = false
  passwordError = false;
  confirmPasswordError = false;

  successRegistration = false
  errorRegistration = false

  showLegalModal = false;
  legalType: 'terms' | 'privacy' = 'terms';
  acceptedTerms = false;

  // Plano
  plan: 'SOLO' | 'SMALL' | 'FULL' | '' = '';

  // Classes de botão
  activeClass = 'bg-blue-600 text-white rounded-xl p-3 flex flex-col items-center gap-1';
  defaultClass = 'bg-gray-100 text-gray-900 rounded-xl p-3 flex flex-col items-center gap-1 hover:bg-gray-200 transition';
  selectedPlanPriceClass = 'text-sm font-semibold text-white mt-1'
  planDefaultPriceDefaultClass = 'text-sm font-semibold text-blue-600 mt-1'

  loading = false;
  errorMsg: string | null = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    const state = history.state as { plan?: 'SOLO' | 'SMALL' | 'FULL' };

    if (state?.plan) {
      this.plan = state.plan;
    }
  }

  selectPlan(plan: 'SOLO' | 'SMALL' | 'FULL') {
    this.plan = plan;
  }

  validateName() {
    this.nameError = this.name.trim().length < 3;
  }
  validateEmail() {
    // regex básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !emailRegex.test(this.email.trim());
  }

  validatePassword() {
    // senha mínima 8, 1 maiúscula, 1 número, 1 especial
    const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    this.passwordError = !passRegex.test(this.password);
  }

  validateConfirmPassword() {
    this.confirmPasswordError = this.confirmPassword !== this.password;
  }


  openLegal(type: 'terms' | 'privacy') {
    this.legalType = type;
    this.showLegalModal = true;
  }

  closeLegal() {
    this.showLegalModal = false;
  }

  async submit(event: Event) {
    event.preventDefault();
    this.errorMsg = null;

    if (!this.acceptedTerms) {
      this.errorMsg = 'You must accept the Terms and Privacy Policy';
      return;
    }

    this.validateName();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    // Validações básicas
    if (!this.name || !this.email || !this.password || !this.confirmPassword || !this.plan) {
      this.errorMsg = 'Preencha todos os campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'As senhas não conferem';
      return;
    }

    if (!this.stripeCard) {
      this.errorMsg = 'Componente de cartão não carregado';
      return;
    }

    this.loading = true;

    let paymentMethod: any;
    try {
      paymentMethod = await this.stripeCard.getCardData(false);
    } catch (err: any) {
      this.loading = false;
      this.errorMsg = err.message || 'Erro no cartão';
      return;
    }

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      plan: this.plan,
      paymentMethodId: paymentMethod.id
    };

    this.auth.register(payload).subscribe({
      next: (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.loading = false;
        this.successRegistration = true
        this.errorRegistration = false

        setTimeout(() => {
          this.router.navigate(['/dashboard'])
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.successRegistration = false
        this.errorRegistration = true
        console.error(err);
      }
    });
  }
}