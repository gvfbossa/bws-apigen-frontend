import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TermsModalComponent } from "../../shared/terms-modal/terms-modal.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { UserService } from '../../../services/user.service';
import { UserDashboard } from '../../../model/userdashboard.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TermsModalComponent, FormsModule, ConfirmDialogComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  user: UserDashboard | null = null;

  loading = false

  usedMachines = 0;
  maxMachines = 0;

  showLegalModal = false;
  legalType: 'terms' | 'privacy' | 'lgpd' = 'terms';

  editingPassword = false;
  updatingPassword = false
  confirmPasswordError = false


  showCurrent = false;
  showNew = false;
  showConfirm = false;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  passwordError = false;
  passwordFormatError = false
  passwordSuccess = false;

  isPlanEligiblePremiumContact = false;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserDashboard();
  }

  private loadUserDashboard() {
    this.userService.getDashboardInfo().subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/login'])
        } else if (user.licenseStatus !== 'ACTIVE') {
          this.router.navigate(['/login'])
        }
        this.user = user;

        this.setPlanLimits(user.plan);
        this.usedMachines = user.usedMachines;
        this.maxMachines = user.maxMachines;
        this.isPlanEligiblePremiumContact = user.isPlanEligiblePremiumContact;
      },
      error: (err) => {
        console.error('Erro ao carregar dados do dashboard:', err);
        this.router.navigate(['login'])
      }
    });
  }

  openLegal(type: 'terms' | 'privacy' | 'lgpd') {
    this.legalType = type;
    this.showLegalModal = true;
  }

  closeLegal() {
    this.showLegalModal = false;
  }

  setPlanLimits(plan: string) {
    switch (plan) {
      case 'SOLO':
        this.maxMachines = 1;
        break;
      case 'SMALL':
        this.maxMachines = 5;
        break;
      case 'FULL':
        this.maxMachines = 10;
        break;
      case 'ADMIN':
        this.maxMachines = 9999
        break
      default:
        this.maxMachines = 0;
    }
  }

  cancelEdit() {
    this.editingPassword = false;
    this.passwordError = false;
    this.passwordSuccess = false;
  }

  onChangePassword() {
    // reset
    this.passwordError = false;
    this.passwordSuccess = false;
    this.confirmPasswordError = false;

    // regex pra validar senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // uso
    if (!this.currentPassword || !passwordRegex.test(this.currentPassword)) {
      this.passwordFormatError = true;
      return;
    }

    // validações
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.passwordError = true;
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.confirmPasswordError = true;
      this.passwordError = true; // se quiser mostrar o mesmo erro geral
      return;
    }

    // tudo certo, chama backend
    this.passwordFormatError = false

    this.editingPassword = true;
    this.updatingPassword = true

    this.authService.changePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.passwordSuccess = true;

          this.updatingPassword = false
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';

          setTimeout(() => {
            this.editingPassword = false;
          }, 3000);
        },
        error: err => {
          this.passwordError = true;
          this.updatingPassword = false
        }
      });
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

}