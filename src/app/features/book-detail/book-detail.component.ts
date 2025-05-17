import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { CartService } from '../../core/services/cart.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, BookCardComponent],
  template: `
    <div class="book-detail-page" *ngIf="book; else loading">
      <div class="container">
        <div class="breadcrumbs">
          <a routerLink="/">Home</a> / 
          <a routerLink="/books">Books</a> / 
          <a routerLink="/books" [queryParams]="{category: book.category.toLowerCase()}">{{book.category}}</a> / 
          <span>{{book.title}}</span>
        </div>

        <div class="book-detail-content">
          <div class="book-cover">
            <img [src]="book.coverImage" [alt]="book.title">
            <div class="book-badges">
              <span *ngIf="book.featured" class="badge featured">Featured</span>
              <span *ngIf="book.bestseller" class="badge bestseller">Bestseller</span>
              <span *ngIf="book.discountPercentage" class="badge discount">
                {{book.discountPercentage}}% OFF
              </span>
            </div>
          </div>

          <div class="book-info">
            <h1 class="book-title">{{book.title}}</h1>
            <p class="book-author">by <strong>{{book.author}}</strong></p>

            <div class="book-rating">
              <div class="stars" [attr.aria-label]="'Rated ' + book.rating + ' out of 5'">
                <ng-container *ngFor="let i of [1, 2, 3, 4, 5]">
                  <i *ngIf="i <= book.rating" class="fas fa-star"></i>
                  <i *ngIf="i > book.rating && i <= book.rating + 0.5" class="fas fa-star-half-alt"></i>
                  <i *ngIf="i > book.rating + 0.5" class="far fa-star"></i>
                </ng-container>
                <span class="rating-count">({{book.rating}})</span>
              </div>
            </div>

            <div class="book-price">
              <ng-container *ngIf="book.discountPercentage; else normalPrice">
                <span class="original-price">{{ book.price.toFixed(2) }}</span>
                <span class="discount-price">{{ getDiscountedPrice(book).toFixed(2) }}</span>
                <span class="discount-label">Save {{book.discountPercentage}}%</span>
              </ng-container>
              <ng-template #normalPrice>
                <span class="current-price">{{ book.price.toFixed(2) }}</span>
              </ng-template>
            </div>

            <div class="book-availability">
              <i class="fas fa-check-circle"></i> In Stock
            </div>

            <div class="book-actions">
              <div class="quantity-selector">
                <button (click)="decreaseQuantity()" [disabled]="quantity <= 1">&minus;</button>
                <input type="number" [(ngModel)]="quantity" min="1" max="10">
                <button (click)="increaseQuantity()" [disabled]="quantity >= 10">+</button>
              </div>
              <button class="btn btn-primary" (click)="addToCart()">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>

            <div class="book-details">
              <div class="detail-item">
                <span class="detail-label">Publisher:</span>
                <span class="detail-value">{{book.publisher}}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Publication Date:</span>
                <span class="detail-value">{{book.publicationDate | date:'mediumDate'}}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Pages:</span>
                <span class="detail-value">{{book.pages}}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">ISBN:</span>
                <span class="detail-value">{{book.isbn}}</span>
              </div>
            </div>

            <div class="social-share">
              <span>Share: </span>
              <a href="#" class="social-icon" aria-label="Share on Facebook"><i class="fab fa-facebook"></i></a>
              <a href="#" class="social-icon" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-icon" aria-label="Share on Pinterest"><i class="fab fa-pinterest"></i></a>
              <a href="#" class="social-icon" aria-label="Share via Email"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>

        <div class="book-description">
          <h2>Book Description</h2>
          <div class="description-content">
            <p>{{book.description}}</p>
          </div>
        </div>

        <div class="book-reviews">
          <h2>Reviews</h2>
          <div class="reviews-content" *ngIf="book.reviews && book.reviews.length > 0; else noReviews">
            <div class="review-item" *ngFor="let review of book.reviews">
              <div class="review-header">
                <div class="review-author">{{review.userName}}</div>
                <div class="review-date">{{review.date | date:'mediumDate'}}</div>
              </div>
              <div class="review-rating">
                <div class="stars">
                  <ng-container *ngFor="let i of [1, 2, 3, 4, 5]">
                    <i *ngIf="i <= review.rating" class="fas fa-star"></i>
                    <i *ngIf="i > review.rating" class="far fa-star"></i>
                  </ng-container>
                </div>
              </div>
              <div class="review-text">{{review.comment}}</div>
            </div>
          </div>
          <ng-template #noReviews>
            <div class="no-reviews">
              <p>No reviews yet. Be the first to review this book!</p>
            </div>
          </ng-template>
        </div>

        <div class="related-books" *ngIf="relatedBooks.length > 0">
          <h2>You May Also Like</h2>
          <div class="grid">
            <app-book-card *ngFor="let relatedBook of relatedBooks" [book]="relatedBook"></app-book-card>
          </div>
        </div>
      </div>
    </div>

    <ng-template #loading>
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading book details...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .book-detail-page {
      padding: var(--spacing-4) 0;
    }

    .breadcrumbs {
      margin-bottom: var(--spacing-3);
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .breadcrumbs a {
      color: var(--text-secondary);
      text-decoration: none;
    }

    .breadcrumbs a:hover {
      color: var(--primary);
      text-decoration: underline;
    }

    .book-detail-content {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-4);
    }

    .book-cover {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .book-cover img {
      width: 100%;
      height: auto;
      display: block;
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

    .book-title {
      font-size: 2rem;
      margin-bottom: var(--spacing-1);
      color: var(--text-primary);
    }

    .book-author {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-2);
    }

    .book-rating {
      margin-bottom: var(--spacing-2);
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
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: var(--spacing-2);
      display: flex;
      align-items: center;
    }

    .original-price {
      text-decoration: line-through;
      color: var(--text-secondary);
      font-size: 1.1rem;
      margin-right: 8px;
    }

    .discount-price {
      color: var(--error);
    }

    .current-price {
      color: var(--text-primary);
    }

    .discount-label {
      margin-left: 8px;
      background-color: var(--error);
      color: white;
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: var(--radius-sm);
      font-weight: 500;
    }

    .book-availability {
      color: var(--success);
      margin-bottom: var(--spacing-3);
      font-weight: 500;
    }

    .book-availability i {
      margin-right: 4px;
    }

    .book-actions {
      display: flex;
      gap: var(--spacing-2);
      margin-bottom: var(--spacing-3);
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      border: 1px solid var(--divider);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }

    .quantity-selector button {
      background-color: var(--surface);
      border: none;
      width: 36px;
      height: 36px;
      font-size: 1rem;
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

    .book-details {
      border-top: 1px solid var(--divider);
      border-bottom: 1px solid var(--divider);
      padding: var(--spacing-2) 0;
      margin-bottom: var(--spacing-3);
    }

    .detail-item {
      display: flex;
      margin-bottom: 8px;
    }

    .detail-label {
      width: 140px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .social-share {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
    }

    .social-share span {
      color: var(--text-secondary);
      margin-right: 8px;
    }

    .social-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--surface);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      transition: background-color 0.3s ease;
    }

    .social-icon:hover {
      background-color: var(--primary-light);
      color: white;
    }

    .book-description,
    .book-reviews,
    .related-books {
      margin-bottom: var(--spacing-4);
    }

    .book-description h2,
    .book-reviews h2,
    .related-books h2 {
      margin-bottom: var(--spacing-3);
      position: relative;
    }

    .book-description h2::after,
    .book-reviews h2::after,
    .related-books h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--primary);
    }

    .description-content {
      font-size: 1.05rem;
      line-height: 1.6;
      color: var(--text-primary);
    }

    .review-item {
      background-color: var(--paper);
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-2);
      box-shadow: var(--shadow-sm);
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-1);
    }

    .review-author {
      font-weight: 500;
    }

    .review-date {
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .review-rating {
      margin-bottom: var(--spacing-1);
    }

    .review-text {
      line-height: 1.5;
    }

    .no-reviews {
      text-align: center;
      padding: var(--spacing-3);
      background-color: var(--surface);
      border-radius: var(--radius-md);
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(139, 38, 53, 0.2);
      border-top: 4px solid var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: var(--spacing-2);
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 992px) {
      .book-detail-content {
        grid-template-columns: 300px 1fr;
      }
    }

    @media (max-width: 768px) {
      .book-detail-content {
        grid-template-columns: 1fr;
      }

      .book-cover {
        max-width: 300px;
        margin: 0 auto var(--spacing-3);
      }
    }
  `]
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  relatedBooks: Book[] = [];
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadBook(id);
    });
  }

  loadBook(id: number): void {
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
      if (book) {
        this.loadRelatedBooks(book.category);
      }
    });
  }

  loadRelatedBooks(category: string): void {
    this.bookService.getBooksByCategory(category).subscribe(books => {
      this.relatedBooks = books
        .filter(b => b.id !== this.book?.id)
        .slice(0, 4);
    });
  }

  getDiscountedPrice(book: Book): number {
    if (book.discountPercentage) {
      return book.price * (1 - book.discountPercentage / 100);
    }
    return book.price;
  }

  increaseQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addToCart(this.book, this.quantity);
      // Provide feedback to user
      alert(`${this.quantity} ${this.quantity === 1 ? 'copy' : 'copies'} of "${this.book.title}" added to cart!`);
    }
  }
}