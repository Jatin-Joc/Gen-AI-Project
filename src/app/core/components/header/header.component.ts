import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  template: `
    <header [class.scrolled]="scrolled">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              <span class="logo-icon"><i class="fas fa-book-open"></i></span>
              <span class="logo-text">Book-O-Pedia</span>
            </a>
          </div>

          <div class="search-bar">
            <form (submit)="onSearch($event)">
              <input 
                type="text" 
                placeholder="Search books, authors, or genres..." 
                [(ngModel)]="searchTerm" 
                name="search"
              >
              <button type="submit" class="search-button">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>

          <nav [class.mobile-nav-active]="mobileNavActive">
            <ul class="nav-links">
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
              <li><a routerLink="/books" routerLinkActive="active">Books</a></li>
              <li><a routerLink="/about" routerLinkActive="active">About</a></li>
              <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
            </ul>
          </nav>

          <div class="header-actions">
            <a routerLink="/cart" class="cart-icon">
              <i class="fas fa-shopping-cart"></i>
              <span class="cart-count" *ngIf="cartCount > 0">{{ cartCount }}</span>
            </a>
            <button class="mobile-menu-btn" (click)="toggleMobileNav()">
              <i class="fas" [class.fa-bars]="!mobileNavActive" [class.fa-times]="mobileNavActive"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    header {
      background-color: var(--background);
      padding: var(--spacing-2) 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    header.scrolled {
      padding: var(--spacing-1) 0;
      background-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo a {
      display: flex;
      align-items: center;
      color: var(--primary);
      font-weight: 700;
      text-decoration: none;
    }

    .logo-icon {
      font-size: 1.5rem;
      margin-right: var(--spacing-1);
    }

    .logo-text {
      font-family: var(--font-heading);
      font-size: 1.5rem;
    }

    .search-bar {
      flex: 1;
      max-width: 400px;
      margin: 0 var(--spacing-3);
    }

    .search-bar form {
      display: flex;
      position: relative;
    }

    .search-bar input {
      width: 100%;
      padding: 8px 40px 8px 12px;
      border-radius: var(--radius-md);
      border: 1px solid var(--divider);
      font-family: var(--font-body);
    }

    .search-bar input:focus {
      outline: none;
      border-color: var(--primary);
    }

    .search-button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background: none;
      border: none;
      padding: 0 12px;
      color: var(--text-secondary);
    }

    .nav-links {
      display: flex;
      list-style: none;
    }

    .nav-links li {
      margin-left: var(--spacing-2);
    }

    .nav-links a {
      color: var(--text-primary);
      font-weight: 500;
      padding: var(--spacing-1);
      transition: color 0.3s ease;
      text-decoration: none;
    }

    .nav-links a:hover, .nav-links a.active {
      color: var(--primary);
    }

    .header-actions {
      display: flex;
      align-items: center;
    }

    .cart-icon {
      position: relative;
      font-size: 1.25rem;
      color: var(--text-primary);
      margin-left: var(--spacing-2);
    }

    .cart-count {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: var(--primary);
      color: white;
      font-size: 0.75rem;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      margin-left: var(--spacing-2);
      color: var(--text-primary);
    }

    @media (max-width: 992px) {
      .search-bar {
        max-width: 300px;
      }
    }

    @media (max-width: 768px) {
      .search-bar {
        max-width: 220px;
        margin: 0 var(--spacing-1);
      }

      .nav-links {
        display: none;
      }
    }

    @media (max-width: 576px) {
      .search-bar {
        display: none;
      }

      .mobile-menu-btn {
        display: block;
      }

      nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: white;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1001;
        padding-top: 80px;
      }

      nav.mobile-nav-active {
        transform: translateX(0);
      }

      .nav-links {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .nav-links li {
        margin: var(--spacing-2) 0;
      }

      .nav-links a {
        font-size: 1.25rem;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  searchTerm = '';
  cartCount = 0;
  mobileNavActive = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  onSearch(event: Event): void {
    event.preventDefault();
    // Navigate to books page with search term
    window.location.href = `/books?search=${this.searchTerm}`;
  }

  toggleMobileNav(): void {
    this.mobileNavActive = !this.mobileNavActive;
  }
}