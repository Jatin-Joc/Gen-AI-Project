import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book, Category } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BookCardComponent, SearchBarComponent],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Discover Your Next <span class="highlight">Favorite Book</span></h1>
          <p>Explore our vast collection of books from every genre, curated for book lovers of all tastes.</p>
          <app-search-bar (search)="onSearch($event)"></app-search-bar>
          <div class="hero-categories">
            <span>Popular Categories:</span>
            <div class="category-tags">
              <a *ngFor="let category of featuredCategories" 
                [routerLink]="['/books']" 
                [queryParams]="{category: category.id}" 
                class="category-tag">
                <i class="fas" [ngClass]="category.icon"></i> {{category.name}}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="featured section">
      <div class="container">
        <div class="section-header">
          <h2>Featured Books</h2>
          <a routerLink="/books" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="grid">
          <app-book-card *ngFor="let book of featuredBooks" [book]="book"></app-book-card>
        </div>
      </div>
    </section>

    <section class="promo">
      <div class="container">
        <div class="promo-content">
          <div class="promo-text">
            <h2>Summer Reading Sale</h2>
            <p>Enjoy up to 20% off on selected titles this summer. Perfect companions for your beach days!</p>
            <a routerLink="/books" [queryParams]="{discount: true}" class="btn btn-primary">Shop Now</a>
          </div>
        </div>
      </div>
    </section>

    <section class="bestsellers section">
      <div class="container">
        <div class="section-header">
          <h2>Bestsellers</h2>
          <a routerLink="/books" [queryParams]="{bestseller: true}" class="view-all">View All <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="grid">
          <app-book-card *ngFor="let book of bestsellers" [book]="book"></app-book-card>
        </div>
      </div>
    </section>

    <section class="categories section">
      <div class="container">
        <div class="section-header">
          <h2>Browse by Category</h2>
        </div>
        <div class="category-grid">
          <a *ngFor="let category of categories" 
            [routerLink]="['/books']" 
            [queryParams]="{category: category.id}" 
            class="category-card">
            <div class="category-icon">
              <i class="fas" [ngClass]="category.icon"></i>
            </div>
            <h3>{{category.name}}</h3>
          </a>
        </div>
      </div>
    </section>

    <section class="newsletter">
      <div class="container">
        <div class="newsletter-content">
          <h2>Join Our Newsletter</h2>
          <p>Subscribe to our newsletter and be the first to know about new arrivals, special offers, and literary events.</p>
          <form (submit)="onSubscribe($event)" class="newsletter-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(rgba(26, 58, 90, 0.8), rgba(26, 58, 90, 0.7)), 
                  url('https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') center/cover no-repeat;
      padding: var(--spacing-6) 0;
      color: white;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .hero h1 {
      font-size: 2.75rem;
      margin-bottom: var(--spacing-2);
      color: white;
    }

    .highlight {
      color: var(--accent);
    }

    .hero p {
      font-size: 1.2rem;
      margin-bottom: var(--spacing-3);
      opacity: 0.9;
    }

    .hero-categories {
      margin-top: var(--spacing-3);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-categories span {
      margin-bottom: var(--spacing-1);
      opacity: 0.9;
    }

    .category-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--spacing-1);
    }

    .category-tag {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 6px 12px;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      transition: background-color 0.3s ease;
      color: white;
      text-decoration: none;
    }

    .category-tag:hover {
      background-color: rgba(255, 255, 255, 0.3);
      text-decoration: none;
    }

    .category-tag i {
      margin-right: 4px;
    }

    .section {
      padding: var(--spacing-5) 0;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-3);
    }

    .section-header h2 {
      font-size: 1.75rem;
      margin-bottom: 0;
      position: relative;
    }

    .section-header h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--primary);
    }

    .view-all {
      font-weight: 500;
      display: flex;
      align-items: center;
    }

    .view-all i {
      margin-left: 4px;
      transition: transform 0.3s ease;
    }

    .view-all:hover i {
      transform: translateX(4px);
    }

    .promo {
      background-color: var(--accent-light);
      padding: var(--spacing-5) 0;
    }

    .promo-content {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .promo-text {
      max-width: 600px;
    }

    .promo-text h2 {
      color: var(--secondary-dark);
      margin-bottom: var(--spacing-2);
    }

    .promo-text p {
      margin-bottom: var(--spacing-3);
      font-size: 1.1rem;
    }

    .promo-text .btn {
      background-color: var(--secondary);
    }

    .promo-text .btn:hover {
      background-color: var(--secondary-light);
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: var(--spacing-3);
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--spacing-2);
      background-color: var(--paper);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-decoration: none;
      color: var(--text-primary);
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
      text-decoration: none;
    }

    .category-icon {
      width: 60px;
      height: 60px;
      background-color: var(--primary-light);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: var(--spacing-2);
    }

    .category-card h3 {
      font-size: 1rem;
      margin-bottom: 0;
    }

    .newsletter {
      background-color: var(--secondary-light);
      padding: var(--spacing-5) 0;
      color: white;
    }

    .newsletter-content {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }

    .newsletter-content h2 {
      color: white;
      margin-bottom: var(--spacing-2);
    }

    .newsletter-content p {
      margin-bottom: var(--spacing-3);
      opacity: 0.9;
    }

    .newsletter-form {
      display: flex;
      gap: var(--spacing-1);
    }

    .newsletter-form input {
      flex: 1;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      border: none;
      font-family: var(--font-body);
    }

    .newsletter-form .btn {
      background-color: var(--accent);
      color: var(--secondary-dark);
      font-weight: 600;
    }

    .newsletter-form .btn:hover {
      background-color: var(--accent-dark);
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1rem;
      }

      .newsletter-form {
        flex-direction: column;
      }

      .category-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredBooks: Book[] = [];
  bestsellers: Book[] = [];
  categories: Category[] = [];
  featuredCategories: Category[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getFeaturedBooks().subscribe(books => {
      this.featuredBooks = books;
    });

    this.bookService.getBestsellers().subscribe(books => {
      this.bestsellers = books;
    });

    this.bookService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.featuredCategories = categories.slice(0, 4);
    });
  }

  onSearch(term: string): void {
    if (term) {
      window.location.href = `/books?search=${term}`;
    }
  }

  onSubscribe(event: Event): void {
    event.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    // In a real application, this would submit to a backend service
  }
}