import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStripeComponent } from './register-stripe.component';

describe('RegisterStripeComponent', () => {
  let component: RegisterStripeComponent;
  let fixture: ComponentFixture<RegisterStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStripeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
