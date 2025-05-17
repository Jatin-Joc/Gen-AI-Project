import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../core/models/book.model';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="book-card">
      <div class="book-cover">
        <img [src]="book.coverImage" [alt]="book.title" loading="lazy">
        <div class="book-badges">
          <span *ngIf="book.featured" class="badge featured">Featured</span>
          <span *ngIf="book.bestseller" class="badge bestseller">Bestseller</span>
          <span *ngIf="book.discountPercentage" class="badge discount">
            {{ book.discountPercentage }}% OFF
          </span>
        </div>
      </div>
      <div class="book-info">
        <a [routerLink]="['/books', book.id]" class="book-title">{{ book.title }}</a>
        <div class="book-author">by {{ book.author }}</div>
        <div class="book-rating">
          <div class="stars" [attr.aria-label]="'Rated ' + book.rating + ' out of 5'">
            <ng-container *ngFor="let i of [1, 2, 3, 4, 5]">
              <i *ngIf="i <= book.rating" class="fas fa-star"></i>
              <i *ngIf="i > book.rating && i <= book.rating + 0.5" class="fas fa-star-half-alt"></i>
              <i *ngIf="i > book.rating + 0.5" class="far fa-star"></i>
            </ng-container>
            <span class="rating-count">({{ book.rating }})</span>
          </div>
        </div>
        <div class="book-price">
          <ng-container *ngIf="book.discountPercentage; else normalPrice">
            <span class="original-price">{{ book.price | currency }}</span>
            <span class="discount-price">{{ getDiscountedPrice(book) | currency }}</span>
          </ng-container>
          <ng-template #normalPrice>
            <span>{{ book.price | currency }}</span>
          </ng-template>
        </div>
        <div class="book-actions">
          <button class="btn btn-primary" (click)="addToCart($event)">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <a [routerLink]="['/books', book.id]" class="btn btn-outline">
            <i class="fas fa-info-circle"></i> Details
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .book-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: var(--radius-md);
      overflow: hidden;
      background-color: var(--paper);
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .book-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .book-cover {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .book-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .book-card:hover .book-cover img {
      transform: scale(1.05);
    }

    .book-badges {
      position: absolute;
      top: var(--spacing-1);
      left: var(--spacing-1);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .badge {
      border-radius: var(--radius-sm);
      padding: 4px 8px;
      font-size: 0.75rem;
      font-weight: 500;
      color: white;
    }

    .featured {
      background-color: var(--primary);
    }

    .bestseller {
      background-color: var(--secondary);
    }

    .discount {
      background-color: var(--accent);
    }

    .book-info {
      padding: var(--spacing-2);
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .book-title {
      font-weight: 600;
      color: var(--text-primary);
      font-family: var(--font-heading);
      font-size: 1.1rem;
      margin-bottom: 4px;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .book-author {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: var(--spacing-1);
    }

    .book-rating {
      margin-bottom: var(--spacing-1);
    }

    .stars {
      color: #F9A825;
    }

    .rating-count {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-left: 4px;
    }

    .book-price {
      margin-bottom: var(--spacing-2);
      font-weight: 600;
      font-size: 1.1rem;
    }

    .original-price {
      text-decoration: line-through;
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-right: 8px;
    }

    .discount-price {
      color: var(--error);
    }

    .book-actions {
      margin-top: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .book-actions .btn {
      padding: 8px;
      font-size: 0.9rem;
      text-align: center;
    }

    .book-actions .btn i {
      margin-right: 4px;
    }

    @media (max-width: 576px) {
      .book-actions {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BookCardComponent {
  @Input() book!: Book;

  constructor(private cartService: CartService) {}

  getDiscountedPrice(book: Book): number {
    if (book.discountPercentage) {
      return book.price * (1 - book.discountPercentage / 100);
    }
    return book.price;
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.book);
  }
}