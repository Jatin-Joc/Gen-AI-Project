import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-section about">
            <h3 class="footer-logo">
              <i class="fas fa-book-open"></i> BookHaven
            </h3>
            <p>Discover your next favorite read at BookHaven, your premium destination for books of all genres.</p>
            <div class="social-icons">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
            </div>
          </div>

          <div class="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/books">All Books</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/contact">Contact</a></li>
            </ul>
          </div>

          <div class="footer-section categories">
            <h3>Categories</h3>
            <ul>
              <li><a routerLink="/books" [queryParams]="{category: 'fiction'}">Fiction</a></li>
              <li><a routerLink="/books" [queryParams]="{category: 'mystery'}">Mystery</a></li>
              <li><a routerLink="/books" [queryParams]="{category: 'biography'}">Biography</a></li>
              <li><a routerLink="/books" [queryParams]="{category: 'self-help'}">Self-Help</a></li>
            </ul>
          </div>

          <div class="footer-section contact">
            <h3>Contact Info</h3>
            <ul>
              <li><i class="fas fa-map-marker-alt"></i> 123 Book Street, Reading, CA 94567</li>
              <li><i class="fas fa-phone"></i> (555) 123-4567</li>
              <li><i class="fas fa-envelope"></i> info&#64;bookhaven.com</li>
              <li><i class="fas fa-clock"></i> Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="payment-methods">
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-amex"></i>
            <i class="fab fa-cc-paypal"></i>
          </div>
          <p>&copy; 2025 BookHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: var(--secondary);
      color: white;
      padding: var(--spacing-4) 0 var(--spacing-2);
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-3);
      margin-bottom: var(--spacing-3);
    }

    .footer-section h3 {
      color: white;
      margin-bottom: var(--spacing-2);
      font-size: 1.25rem;
    }

    .footer-logo {
      font-family: var(--font-heading);
      font-size: 1.5rem;
    }

    .footer-section p {
      color: #f1f1f1;
      line-height: 1.6;
    }

    .social-icons {
      margin-top: var(--spacing-2);
    }

    .social-icons a {
      display: inline-block;
      width: 36px;
      height: 36px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      text-align: center;
      line-height: 36px;
      margin-right: var(--spacing-1);
      transition: background-color 0.3s ease;
    }

    .social-icons a:hover {
      background-color: var(--primary);
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section ul li {
      margin-bottom: var(--spacing-1);
    }

    .footer-section ul li a {
      color: #f1f1f1;
      transition: color 0.3s ease;
      text-decoration: none;
    }

    .footer-section ul li a:hover {
      color: var(--accent);
      text-decoration: underline;
    }

    .footer-section.contact ul li {
      display: flex;
      align-items: flex-start;
      margin-bottom: var(--spacing-1);
    }

    .footer-section.contact ul li i {
      margin-right: var(--spacing-1);
      color: var(--accent);
      width: 20px;
      text-align: center;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: var(--spacing-2);
      text-align: center;
    }

    .payment-methods {
      margin-bottom: var(--spacing-1);
    }

    .payment-methods i {
      font-size: 1.5rem;
      margin: 0 var(--spacing-1);
      color: #f1f1f1;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--spacing-2);
      }
    }

    @media (max-width: 576px) {
      .footer-content {
        grid-template-columns: 1fr;
      }

      .footer-section {
        margin-bottom: var(--spacing-3);
      }
    }
  `]
})
export class FooterComponent {}