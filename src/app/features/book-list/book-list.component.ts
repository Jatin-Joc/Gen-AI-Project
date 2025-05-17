import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Book, Category } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, BookCardComponent, SearchBarComponent],
  template: `
    <section class="book-list-page">
      <div class="container">
        <div class="page-header">
          <h1>Explore Our Books</h1>
          <app-search-bar (search)="onSearch($event)"></app-search-bar>
        </div>

        <div class="book-list-content">
          <aside class="filters">
            <div class="filter-section">
              <h3>Categories</h3>
              <ul class="category-list">
                <li>
                  <a 
                    [class.active]="!selectedCategory" 
                    (click)="selectCategory('')">
                    All Categories
                  </a>
                </li>
                <li *ngFor="let category of categories">
                  <a 
                    [class.active]="selectedCategory === category.id" 
                    (click)="selectCategory(category.id)">
                    <i class="fas" [ngClass]="category.icon"></i> {{category.name}}
                  </a>
                </li>
              </ul>
            </div>

            <div class="filter-section">
              <h3>Price Range</h3>
              <div class="price-slider">
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5" 
                  [(ngModel)]="maxPrice" 
                  (change)="applyFilters()">
                <div class="price-labels">
                  <span>$10</span>
                  <span>{{ maxPrice | currency:'USD':'symbol':'1.0-0' }}</span>
                </div>
              </div>
            </div>

            <div class="filter-section">
              <h3>Special Offers</h3>
              <div class="checkbox-filter">
                <label>
                  <input type="checkbox" [(ngModel)]="showFeatured" (change)="applyFilters()">
                  Featured
                </label>
              </div>
              <div class="checkbox-filter">
                <label>
                  <input type="checkbox" [(ngModel)]="showBestsellers" (change)="applyFilters()">
                  Bestsellers
                </label>
              </div>
              <div class="checkbox-filter">
                <label>
                  <input type="checkbox" [(ngModel)]="showDiscounted" (change)="applyFilters()">
                  On Sale
                </label>
              </div>
            </div>

            <button class="btn btn-outline reset-filters" (click)="resetFilters()">
              <i class="fas fa-sync-alt"></i> Reset Filters
            </button>
          </aside>

          <div class="book-grid">
            <div class="books-header">
              <div class="results-count">
                <span>{{filteredBooks.length}} books found</span>
              </div>
              <div class="sort-options">
                <label for="sort-select">Sort by:</label>
                <select id="sort-select" [(ngModel)]="sortOption" (change)="applySorting()">
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="rating-desc">Rating (Highest)</option>
                </select>
              </div>
            </div>

            <ng-container *ngIf="filteredBooks.length > 0; else noBooks">
              <div class="grid">
                <app-book-card *ngFor="let book of filteredBooks" [book]="book"></app-book-card>
              </div>
            </ng-container>

            <ng-template #noBooks>
              <div class="no-books-found">
                <i class="fas fa-search fa-3x"></i>
                <h3>No books found</h3>
                <p>Try adjusting your search or filter criteria.</p>
                <button class="btn btn-primary" (click)="resetFilters()">Clear All Filters</button>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .book-list-page {
      padding: var(--spacing-4) 0;
    }

    .page-header {
      text-align: center;
      margin-bottom: var(--spacing-4);
    }

    .page-header h1 {
      margin-bottom: var(--spacing-3);
    }

    .book-list-content {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: var(--spacing-4);
    }

    .filters {
      background-color: var(--paper);
      padding: var(--spacing-2);
      border-radius: var(--radius-md);
      position: sticky;
      top: 100px;
      height: fit-content;
      box-shadow: var(--shadow-sm);
    }

    .filter-section {
      margin-bottom: var(--spacing-3);
      padding-bottom: var(--spacing-2);
      border-bottom: 1px solid var(--divider);
    }

    .filter-section h3 {
      font-size: 1.1rem;
      margin-bottom: var(--spacing-2);
      color: var(--secondary);
    }

    .category-list {
      list-style: none;
    }

    .category-list li {
      margin-bottom: 8px;
    }

    .category-list a {
      display: flex;
      align-items: center;
      color: var(--text-primary);
      padding: 6px 8px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .category-list a:hover,
    .category-list a.active {
      background-color: rgba(139, 38, 53, 0.1);
      color: var(--primary);
    }

    .category-list a i {
      margin-right: 8px;
      width: 16px;
      text-align: center;
    }

    .price-slider input {
      width: 100%;
      margin-bottom: var(--spacing-1);
    }

    .price-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .checkbox-filter {
      margin-bottom: 8px;
    }

    .checkbox-filter label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .checkbox-filter input {
      margin-right: 8px;
    }

    .reset-filters {
      width: 100%;
      margin-top: var(--spacing-1);
    }

    .reset-filters i {
      margin-right: 8px;
    }

    .book-grid {
      width: 100%;
    }

    .books-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-3);
    }

    .results-count {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .sort-options {
      display: flex;
      align-items: center;
    }

    .sort-options label {
      margin-right: 8px;
      font-size: 0.875rem;
    }

    .sort-options select {
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--divider);
      background-color: var(--paper);
      font-family: var(--font-body);
    }

    .no-books-found {
      text-align: center;
      padding: var(--spacing-5);
      background-color: var(--paper);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }

    .no-books-found i {
      color: var(--primary-light);
      margin-bottom: var(--spacing-2);
      opacity: 0.6;
    }

    .no-books-found h3 {
      margin-bottom: var(--spacing-1);
    }

    .no-books-found p {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-3);
    }

    @media (max-width: 992px) {
      .book-list-content {
        grid-template-columns: 200px 1fr;
        gap: var(--spacing-3);
      }
    }

    @media (max-width: 768px) {
      .book-list-content {
        grid-template-columns: 1fr;
      }

      .filters {
        position: static;
        margin-bottom: var(--spacing-3);
      }
    }
  `]
})
export class BookListComponent implements OnInit {
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  categories: Category[] = [];
  
  // Filters
  selectedCategory = '';
  maxPrice = 50;
  showFeatured = false;
  showBestsellers = false;
  showDiscounted = false;
  searchTerm = '';
  sortOption = 'title-asc';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.allBooks = books;
      this.getQueryParams();
      this.applyFilters();
    });

    this.bookService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      
      if (params['search']) {
        this.searchTerm = params['search'];
      }
      
      if (params['featured'] === 'true') {
        this.showFeatured = true;
      }
      
      if (params['bestseller'] === 'true') {
        this.showBestsellers = true;
      }
      
      if (params['discount'] === 'true') {
        this.showDiscounted = true;
      }
      
      this.applyFilters();
    });
  }

  applyFilters(): void {
    // Start with all books
    let filtered = [...this.allBooks];
    
    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(book => 
        book.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(book => book.price <= this.maxPrice);
    
    // Apply featured filter
    if (this.showFeatured) {
      filtered = filtered.filter(book => book.featured);
    }
    
    // Apply bestseller filter
    if (this.showBestsellers) {
      filtered = filtered.filter(book => book.bestseller);
    }
    
    // Apply discount filter
    if (this.showDiscounted) {
      filtered = filtered.filter(book => book.discountPercentage);
    }
    
    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.category.toLowerCase().includes(term)
      );
    }
    
    this.filteredBooks = filtered;
    this.applySorting();
  }

  applySorting(): void {
    switch (this.sortOption) {
      case 'title-asc':
        this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        this.filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        this.filteredBooks.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredBooks.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        this.filteredBooks.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.updateQueryParams();
    this.applyFilters();
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.updateQueryParams();
    this.applyFilters();
  }

  updateQueryParams(): void {
    const queryParams: any = {};
    
    if (this.selectedCategory) {
      queryParams.category = this.selectedCategory;
    }
    
    if (this.searchTerm) {
      queryParams.search = this.searchTerm;
    }
    
    if (this.showFeatured) {
      queryParams.featured = true;
    }
    
    if (this.showBestsellers) {
      queryParams.bestseller = true;
    }
    
    if (this.showDiscounted) {
      queryParams.discount = true;
    }
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  resetFilters(): void {
    this.selectedCategory = '';
    this.maxPrice = 50;
    this.showFeatured = false;
    this.showBestsellers = false;
    this.showDiscounted = false;
    this.searchTerm = '';
    this.sortOption = 'title-asc';
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
    
    this.applyFilters();
  }
}