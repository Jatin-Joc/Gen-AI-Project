import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe],
  providers: [FormBuilder],
  template: `
    <section class="checkout-page">
      <div class="container">
        <h1>Checkout</h1>

        <div class="checkout-content">
          <div class="checkout-form-container">
            <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
              <div class="form-section">
                <h2>Contact Information</h2>
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" formControlName="firstName">
                    <div 
                      *ngIf="submitted && checkoutForm.get('firstName')?.errors?.['required']" 
                      class="error-message">
                      First name is required
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" formControlName="lastName">
                    <div 
                      *ngIf="submitted && checkoutForm.get('lastName')?.errors?.['required']" 
                      class="error-message">
                      Last name is required
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" formControlName="email">
                    <div 
                      *ngIf="submitted && checkoutForm.get('email')?.errors?.['required']" 
                      class="error-message">
                      Email is required
                    </div>
                    <div 
                      *ngIf="submitted && checkoutForm.get('email')?.errors?.['email']" 
                      class="error-message">
                      Please enter a valid email
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone *</label>
                    <input type="tel" id="phone" formControlName="phone">
                    <div 
                      *ngIf="submitted && checkoutForm.get('phone')?.errors?.['required']" 
                      class="error-message">
                      Phone number is required
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <h2>Shipping Address</h2>
                <div class="form-group">
                  <label for="address">Street Address *</label>
                  <input type="text" id="address" formControlName="address">
                  <div 
                    *ngIf="submitted && checkoutForm.get('address')?.errors?.['required']" 
                    class="error-message">
                    Address is required
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="city">City *</label>
                    <input type="text" id="city" formControlName="city">
                    <div 
                      *ngIf="submitted && checkoutForm.get('city')?.errors?.['required']" 
                      class="error-message">
                      City is required
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="state">State *</label>
                    <input type="text" id="state" formControlName="state">
                    <div 
                      *ngIf="submitted && checkoutForm.get('state')?.errors?.['required']" 
                      class="error-message">
                      State is required
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="zipCode">ZIP Code *</label>
                    <input type="text" id="zipCode" formControlName="zipCode">
                    <div 
                      *ngIf="submitted && checkoutForm.get('zipCode')?.errors?.['required']" 
                      class="error-message">
                      ZIP code is required
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="country">Country *</label>
                    <select id="country" formControlName="country">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    <div 
                      *ngIf="submitted && checkoutForm.get('country')?.errors?.['required']" 
                      class="error-message">
                      Country is required
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <h2>Payment Information</h2>
                <div class="form-group">
                  <label for="cardNumber">Card Number *</label>
                  <input type="text" id="cardNumber" formControlName="cardNumber" placeholder="XXXX XXXX XXXX XXXX">
                  <div 
                    *ngIf="submitted && checkoutForm.get('cardNumber')?.errors?.['required']" 
                    class="error-message">
                    Card number is required
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="cardName">Name on Card *</label>
                    <input type="text" id="cardName" formControlName="cardName">
                    <div 
                      *ngIf="submitted && checkoutForm.get('cardName')?.errors?.['required']" 
                      class="error-message">
                      Name on card is required
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="expiryDate">Expiry Date *</label>
                    <input type="text" id="expiryDate" formControlName="expiryDate" placeholder="MM/YY">
                    <div 
                      *ngIf="submitted && checkoutForm.get('expiryDate')?.errors?.['required']" 
                      class="error-message">
                      Expiry date is required
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV *</label>
                    <input type="text" id="cvv" formControlName="cvv" placeholder="XXX">
                    <div 
                      *ngIf="submitted && checkoutForm.get('cvv')?.errors?.['required']" 
                      class="error-message">
                      CVV is required
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <a [routerLink]="['/cart']" class="btn btn-outline">Back to Cart</a>
                <button type="submit" class="btn btn-primary">Place Order</button>
              </div>
            </form>
          </div>

          <div class="order-summary">
            <h2>Order Summary</h2>
            
            <div class="summary-items">
              <div class="summary-item" *ngFor="let item of cartItems">
                <div class="item-image">
                  <img [src]="item.book.coverImage" [alt]="item.book.title">
                  <span class="item-quantity">{{item.quantity}}</span>
                </div>
                <div class="item-info">
                  <h4>{{item.book.title}}</h4>
                  <p class="item-author">by {{item.book.author}}</p>
                </div>
                <div class="item-price">{{ getItemTotal(item) | currency }}</div>
              </div>
            </div>

            <div class="summary-details">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>{{ cartTotal | currency }}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span>
                  <ng-container *ngIf="cartTotal >= 35; else normalShipping">
                    <span class="free-shipping">Free</span>
                  </ng-container>
                  <ng-template #normalShipping>
                    $4.99
                  </ng-template>
                </span>
              </div>
              <div class="summary-row">
                <span>Tax (8%)</span>
                <span>{{ cartTotal * 0.08 | currency }}</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span>{{ orderTotal | currency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .checkout-page {
      padding: var(--spacing-4) 0;
    }

    h1 {
      margin-bottom: var(--spacing-4);
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: var(--spacing-4);
    }

    .checkout-form-container {
      background-color: var(--paper);
      border-radius: var(--radius-md);
      padding: var(--spacing-3);
      box-shadow: var(--shadow-sm);
    }

    .form-section {
      margin-bottom: var(--spacing-3);
      padding-bottom: var(--spacing-3);
      border-bottom: 1px solid var(--divider);
    }

    .form-section h2 {
      font-size: 1.25rem;
      margin-bottom: var(--spacing-2);
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-2);
    }

    .form-group {
      margin-bottom: var(--spacing-2);
    }

    .form-group label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--divider);
      border-radius: var(--radius-sm);
      font-family: var(--font-body);
      transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(139, 38, 53, 0.2);
    }

    .error-message {
      color: var(--error);
      font-size: 0.8rem;
      margin-top: 4px;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: var(--spacing-3);
    }

    .order-summary {
      background-color: var(--paper);
      border-radius: var(--radius-md);
      padding: var(--spacing-3);
      box-shadow: var(--shadow-sm);
      align-self: start;
      position: sticky;
      top: 100px;
    }

    .order-summary h2 {
      font-size: 1.25rem;
      margin-bottom: var(--spacing-3);
      padding-bottom: var(--spacing-2);
      border-bottom: 1px solid var(--divider);
    }

    .summary-items {
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: var(--spacing-3);
    }

    .summary-item {
      display: flex;
      margin-bottom: var(--spacing-2);
      padding-bottom: var(--spacing-2);
      border-bottom: 1px solid var(--divider);
    }

    .summary-item:last-child {
      border-bottom: none;
    }

    .item-image {
      position: relative;
      margin-right: var(--spacing-2);
    }

    .item-image img {
      width: 60px;
      height: 80px;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }

    .item-quantity {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: var(--primary);
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
    }

    .item-info {
      flex: 1;
    }

    .item-info h4 {
      font-size: 0.95rem;
      margin-bottom: 4px;
    }

    .item-author {
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    .item-price {
      font-weight: 500;
    }

    .summary-details {
      margin-top: var(--spacing-2);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-1);
    }

    .summary-row.total {
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: var(--spacing-2);
      padding-top: var(--spacing-2);
      border-top: 1px solid var(--divider);
    }

    .free-shipping {
      color: var(--success);
      font-weight: 500;
    }

    @media (max-width: 992px) {
      .checkout-content {
        grid-template-columns: 1fr;
      }

      .order-summary {
        position: static;
        margin-top: var(--spacing-3);
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  cartTotal = 0;
  orderTotal = 0;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['US', Validators.required],
      cardNumber: ['', Validators.required],
      cardName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  getItemTotal(item: CartItem): number {
    const price = item.book.discountPercentage
      ? item.book.price * (1 - item.book.discountPercentage / 100)
      : item.book.price;
    
    return price * item.quantity;
  }

  calculateTotals(): void {
    this.cartTotal = this.cartItems.reduce((sum, item) => {
      return sum + this.getItemTotal(item);
    }, 0);

    const shipping = this.cartTotal >= 35 ? 0 : 4.99;
    const tax = this.cartTotal * 0.08;
    
    this.orderTotal = this.cartTotal + shipping + tax;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.checkoutForm.valid) {
      // In a real application, this would process the order
      alert('Order placed successfully! Thank you for your purchase.');
      
      // Clear cart and redirect to a confirmation page
      this.cartService.clearCart();
      this.router.navigate(['/']);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.checkoutForm.controls).forEach(key => {
        const control = this.checkoutForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}