import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../core/models/cart.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <section class="cart-page">
      <div class="container">
        <h1>Your Shopping Cart</h1>

        <ng-container *ngIf="cartItems.length > 0; else emptyCart">
          <div class="cart-content">
            <div class="cart-items">
              <div class="cart-header">
                <div class="header-product">Product</div>
                <div class="header-price">Price</div>
                <div class="header-quantity">Quantity</div>
                <div class="header-total">Total</div>
                <div class="header-actions"></div>
              </div>

              <div class="cart-item" *ngFor="let item of cartItems">
                <div class="item-product">
                  <img [src]="item.book.coverImage" [alt]="item.book.title">
                  <div class="item-details">
                    <h3><a [routerLink]="['/books', item.book.id]">{{item.book.title}}</a></h3>
                    <p class="item-author">by {{item.book.author}}</p>
                  </div>
                </div>
                <div class="item-price">
                  <ng-container *ngIf="item.book.discountPercentage; else normalPrice">
                    <span class="original-price">{{item.book.price | currency}}</span>
                    <span class="discount-price">{{getDiscountedPrice(item.book) | currency}}</span>
                  </ng-container>
                  <ng-template #normalPrice>
                    <span>{{item.book.price | currency}}</span>
                  </ng-template>
                </div>
                <div class="item-quantity">
                  <div class="quantity-selector">
                    <button (click)="decreaseQuantity(item)" [disabled]="item.quantity <= 1">&minus;</button>
                    <input type="number" [(ngModel)]="item.quantity" (change)="updateQuantity(item)" min="1" max="10">
                    <button (click)="increaseQuantity(item)" [disabled]="item.quantity >= 10">+</button>
                  </div>
                </div>
                <div class="item-total">
                  {{getItemTotal(item) | currency}}
                </div>
                <div class="item-actions">
                  <button class="btn-remove" (click)="removeItem(item)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="cart-summary">
              <h2>Order Summary</h2>

              <div class="summary-row">
                <span>Subtotal</span>
                <span>{{cartTotal | currency}}</span>
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
                <span>{{(cartTotal * 0.08) | currency}}</span>
              </div>

              <div class="summary-row total">
                <span>Total</span>
                <span>{{orderTotal | currency}}</span>
              </div>

              <div class="promo-code">
                <input type="text" placeholder="Promo code" [(ngModel)]="promoCode">
                <button class="btn btn-outline" (click)="applyPromo()">Apply</button>
              </div>

              <button class="btn btn-primary checkout-btn" routerLink="/checkout">
                Proceed to Checkout
              </button>

              <a routerLink="/books" class="continue-shopping">
                <i class="fas fa-arrow-left"></i> Continue Shopping
              </a>
            </div>
          </div>
        </ng-container>

        <ng-template #emptyCart>
          <div class="empty-cart">
            <i class="fas fa-shopping-cart fa-4x"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any books to your cart yet.</p>
            <a routerLink="/books" class="btn btn-primary">Start Shopping</a>
          </div>
        </ng-template>
      </div>
    </section>
  `,
  styles: [`
    .cart-page {
      padding: var(--spacing-4) 0;
    }

    h1 {
      margin-bottom: var(--spacing-4);
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: var(--spacing-4);
    }

    .cart-items {
      background-color: var(--paper);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }

    .cart-header {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr 40px;
      padding: var(--spacing-2);
      background-color: var(--surface);
      font-weight: 500;
      border-bottom: 1px solid var(--divider);
    }

    .cart-item {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr 40px;
      padding: var(--spacing-2);
      border-bottom: 1px solid var(--divider);
      align-items: center;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-product {
      display: flex;
      align-items: center;
    }

    .item-product img {
      width: 80px;
      height: 120px;
      object-fit: cover;
      border-radius: var(--radius-sm);
      margin-right: var(--spacing-2);
    }

    .item-details h3 {
      font-size: 1rem;
      margin-bottom: 4px;
    }

    .item-author {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .item-price {
      display: flex;
      flex-direction: column;
    }

    .original-price {
      text-decoration: line-through;
      color: var(--text-secondary);
      font-size: 0.8rem;
    }

    .discount-price {
      color: var(--error);
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      border: 1px solid var(--divider);
      border-radius: var(--radius-sm);
      overflow: hidden;
      width: 100px;
    }

    .quantity-selector button {
      background-color: var(--surface);
      border: none;
      width: 28px;
      height: 28px;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .quantity-selector button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quantity-selector input {
      width: 40px;
      text-align: center;
      border: none;
      border-left: 1px solid var(--divider);
      border-right: 1px solid var(--divider);
      font-family: var(--font-body);
    }

    .btn-remove {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .btn-remove:hover {
      color: var(--error);
    }

    .cart-summary {
      background-color: var(--paper);
      border-radius: var(--radius-md);
      padding: var(--spacing-3);
      box-shadow: var(--shadow-sm);
      align-self: start;
      position: sticky;
      top: 100px;
    }

    .cart-summary h2 {
      margin-bottom: var(--spacing-3);
      padding-bottom: var(--spacing-2);
      border-bottom: 1px solid var(--divider);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-2);
    }

    .summary-row.total {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: var(--spacing-2);
      padding-top: var(--spacing-2);
      border-top: 1px solid var(--divider);
    }

    .free-shipping {
      color: var(--success);
      font-weight: 500;
    }

    .promo-code {
      display: flex;
      margin-bottom: var(--spacing-3);
      margin-top: var(--spacing-3);
    }

    .promo-code input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid var(--divider);
      border-radius: var(--radius-sm) 0 0 var(--radius-sm);
      font-family: var(--font-body);
    }

    .promo-code .btn {
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    }

    .checkout-btn {
      width: 100%;
      padding: var(--spacing-2);
      margin-bottom: var(--spacing-2);
    }

    .continue-shopping {
      display: block;
      text-align: center;
      margin-top: var(--spacing-2);
    }

    .continue-shopping i {
      margin-right: 4px;
    }

    .empty-cart {
      text-align: center;
      padding: var(--spacing-5);
      background-color: var(--paper);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }

    .empty-cart i {
      color: var(--primary-light);
      margin-bottom: var(--spacing-3);
      opacity: 0.6;
    }

    .empty-cart h2 {
      margin-bottom: var(--spacing-2);
    }

    .empty-cart p {
      margin-bottom: var(--spacing-3);
      color: var(--text-secondary);
    }

    @media (max-width: 992px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-summary {
        position: static;
        margin-top: var(--spacing-3);
      }
    }

    @media (max-width: 768px) {
      .cart-header {
        display: none;
      }

      .cart-item {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        gap: var(--spacing-2);
      }

      .item-product {
        grid-column: 1 / -1;
      }

      .item-price, .item-quantity, .item-total {
        display: flex;
        align-items: center;
      }

      .item-price::before {
        content: 'Price: ';
        font-weight: 500;
        margin-right: 8px;
      }

      .item-quantity::before {
        content: 'Quantity: ';
        font-weight: 500;
        margin-right: 8px;
      }

      .item-total::before {
        content: 'Total: ';
        font-weight: 500;
        margin-right: 8px;
      }

      .item-actions {
        position: absolute;
        top: var(--spacing-2);
        right: var(--spacing-2);
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  orderTotal = 0;
  promoCode = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  getDiscountedPrice(book: any): number {
    if (book.discountPercentage) {
      return book.price * (1 - book.discountPercentage / 100);
    }
    return book.price;
  }

  getItemTotal(item: CartItem): number {
    const price = this.getDiscountedPrice(item.book);
    return price * item.quantity;
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < 10) {
      item.quantity++;
      this.updateQuantity(item);
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  updateQuantity(item: CartItem): void {
    this.cartService.updateCartItemQuantity(item.book.id, item.quantity);
    this.calculateTotals();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.book.id);
  }

  applyPromo(): void {
    if (this.promoCode.toLowerCase() === 'book10') {
      this.calculateTotals(0.1);
      alert('Promo code applied! 10% discount added.');
    } else {
      alert('Invalid promo code.');
    }
  }

  calculateTotals(discount: number = 0): void {
    this.cartTotal = this.cartItems.reduce((sum, item) => {
      return sum + this.getItemTotal(item);
    }, 0);

    const shipping = this.cartTotal >= 35 ? 0 : 4.99;
    const tax = this.cartTotal * 0.08;
    
    if (discount > 0) {
      const discountAmount = this.cartTotal * discount;
      this.orderTotal = this.cartTotal - discountAmount + shipping + tax;
    } else {
      this.orderTotal = this.cartTotal + shipping + tax;
    }
  }
}