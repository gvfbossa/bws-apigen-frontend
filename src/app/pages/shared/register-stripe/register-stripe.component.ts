import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Stripe,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
  StripeElements
} from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-stripe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-stripe.component.html',
  styleUrls: ['./register-stripe.component.scss'],
})
export class RegisterStripeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('cardNumberElement', { static: true }) cardNumberRef!: ElementRef;
  @ViewChild('cardExpiryElement', { static: true }) cardExpiryRef!: ElementRef;
  @ViewChild('cardCvcElement', { static: true }) cardCvcRef!: ElementRef;

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardNumber!: StripeCardNumberElement;
  private cardExpiry!: StripeCardExpiryElement;
  private cardCvc!: StripeCardCvcElement;

  // Estado visual
  numberError: string | null = null;
  expiryError: string | null = null;
  cvcError: string | null = null;
  allFieldsComplete = false;
  hasError = false;

  private prod: boolean = environment.production
  private pk: string = ''

  // Nome do titular
  cardHolderName = '';

  async ngAfterViewInit() {
    const { loadStripe } = await import('@stripe/stripe-js');

    if (this.prod === true) {
      this.pk = 'pk_live_51SUUvw6z7kDMp1e0vczeqsbTBzex2OuXY9UFAiUWT9ils5pwQWph1ENKQIYMdAOeW02TRiQUeu9EBcptK0egosLK00shKBy2gs'
    }
    else {
      this.pk = 'pk_test_51SUUw69tsePxcvtMWuU8WLb4NERo430ho1kjr13S3sMV6mR3vCrXF047AbQuR0NuooL4GGAVIdZUpIbAFRVuhAEg00ibQn8rcN'
    }

    this.stripe = await loadStripe(this.pk);

    if (!this.stripe) {
      console.error('Erro ao carregar Stripe');
      return;
    }

    this.elements = this.stripe.elements();

    const style = {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': { color: '#aab7c4' },
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      },
      invalid: { color: '#9e2146' }
    };

    this.cardNumber = this.elements.create('cardNumber', { style, placeholder: '1234 5678 9012 3456' });
    this.cardExpiry = this.elements.create('cardExpiry', { style, placeholder: 'MM/AA' });
    this.cardCvc = this.elements.create('cardCvc', { style, placeholder: 'CVV' });

    this.cardNumber.mount(this.cardNumberRef.nativeElement);
    this.cardExpiry.mount(this.cardExpiryRef.nativeElement);
    this.cardCvc.mount(this.cardCvcRef.nativeElement);

    const forceUpdate = () => this.updateComplete();

    this.cardNumber.on('change', forceUpdate);
    this.cardNumber.on('blur', forceUpdate);

    this.cardExpiry.on('change', forceUpdate);
    this.cardExpiry.on('blur', forceUpdate);

    this.cardCvc.on('change', forceUpdate);
    this.cardCvc.on('blur', forceUpdate);
  }

  private updateComplete() {
    if (!this.cardNumber || !this.cardExpiry || !this.cardCvc) return;

    const numberComplete = (this.cardNumber as any)._complete === true;
    const expiryComplete = (this.cardExpiry as any)._complete === true;
    const cvcComplete = (this.cardCvc as any)._complete === true;

    this.allFieldsComplete = numberComplete && expiryComplete && cvcComplete;
    this.hasError = !!this.numberError || !!this.expiryError || !!this.cvcError;
  }

  updateCardHolder(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cardHolderName = input.value.trim().toUpperCase();
  }

  async getCardData(allowEmpty = false): Promise<any> {
    if (!this.stripe || !this.cardNumber) {
      throw new Error('Stripe não foi inicializado');
    }

    this.updateComplete();

    if (!this.allFieldsComplete) {
      if (allowEmpty) return null;
      throw new Error('Preencha todos os campos do cartão corretamente');
    }

    if (this.hasError) {
      throw new Error('Corrija os erros no cartão');
    }

    const result = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardNumber,
      billing_details: {
        name: this.cardHolderName || 'CLIENTE'
      }
    });

    if (result.error) {
      throw new Error(result.error.message || 'Erro no cartão');
    }

    return result.paymentMethod;
  }

  ngOnDestroy() {
    this.cardNumber?.destroy();
    this.cardExpiry?.destroy();
    this.cardCvc?.destroy();
  }
}