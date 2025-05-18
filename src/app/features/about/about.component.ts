import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="about-page">
      <div class="container">
        <div class="page-header">
          <h1>About BookHaven</h1>
          <p class="subtitle">Your Premium Destination for Book Lovers</p>
        </div>

        <div class="about-intro">
          <div class="about-image">
            <img src="https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Bookstore interior">
          </div>
          <div class="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2015, BookHaven started as a small corner bookshop in San Francisco with a simple mission: 
              to connect readers with their next favorite book. What began as a passion project has grown into 
              a comprehensive online platform serving book lovers across the country.
            </p>
            <p>
              Our team consists of dedicated bibliophiles who are committed to curating an exceptional collection 
              of books across all genres. We believe that the right book has the power to inspire, educate, and transform lives.
            </p>
          </div>
        </div>

        <div class="values-section">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-book-reader"></i>
              </div>
              <h3>Passion for Reading</h3>
              <p>We're avid readers ourselves, and our love for books drives everything we do. We believe 
                in the transformative power of literature.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-hand-holding-heart"></i>
              </div>
              <h3>Customer Experience</h3>
              <p>Every interaction with BookHaven is designed to be seamless, enjoyable, and memorable. 
                Your satisfaction is our highest priority.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-globe"></i>
              </div>
              <h3>Community Focus</h3>
              <p>We actively support literacy programs and collaborate with local authors, publishers, 
                and reading groups to foster a vibrant literary community.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <i class="fas fa-leaf"></i>
              </div>
              <h3>Sustainability</h3>
              <p>We're committed to environmentally responsible practices, including eco-friendly 
                packaging and supporting publishers who prioritize sustainable production.</p>
            </div>
          </div>
        </div>

        <div class="team-section">
          <h2>Meet Our Team</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-image">
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Emily Johnson">
              </div>
              <h3>Aruva Tejasree</h3>
              <p class="member-title">Founder & CEO</p>
              <p class="member-bio">Former literature professor with a passion for making great books accessible to everyone.</p>
            </div>
            <div class="team-member">
              <div class="member-image">
                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Michael Chen">
              </div>
              <h3>Tarakeswar</h3>
              <p class="member-title">Chief Curator</p>
              <p class="member-bio">Lifelong book collector with an uncanny ability to recommend the perfect read.</p>
            </div>
            <div class="team-member">
              <div class="member-image">
                <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Sophia Rodriguez">
              </div>
              <h3>Vallusha Nikkam P</h3>
              <p class="member-title">Community Manager</p>
              <p class="member-bio">Literary event coordinator who loves connecting readers with authors.</p>
            </div>
            <div class="team-member">
              <div class="member-image">
                <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="David Walker">
              </div>
              <h3>Jatin Joshi</h3>
              <p class="member-title">Technology Director</p>
              <p class="member-bio">Tech enthusiast who ensures our online experience is as delightful as visiting a physical bookstore.</p>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <h2>Join Our Community</h2>
          <p>Become part of the BookHaven family and enjoy exclusive benefits, early access to new releases, and special events.</p>
          <div class="cta-buttons">
            <a routerLink="/books" class="btn btn-primary">Browse Our Collection</a>
            <a routerLink="/contact" class="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-page {
      padding: var(--spacing-4) 0;
    }

    .page-header {
      text-align: center;
      margin-bottom: var(--spacing-5);
    }

    .subtitle {
      font-size: 1.2rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }

    .about-intro {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-5);
      align-items: center;
    }

    .about-image {
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .about-image img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }

    .about-image:hover img {
      transform: scale(1.03);
    }

    .about-text h2 {
      margin-bottom: var(--spacing-2);
      position: relative;
    }

    .about-text h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--primary);
    }

    .about-text p {
      margin-bottom: var(--spacing-2);
      line-height: 1.6;
    }

    .values-section {
      margin-bottom: var(--spacing-5);
    }

    .values-section h2 {
      text-align: center;
      margin-bottom: var(--spacing-4);
      position: relative;
    }

    .values-section h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: var(--primary);
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-3);
    }

    .value-card {
      background-color: var(--paper);
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .value-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .value-icon {
      width: 70px;
      height: 70px;
      background-color: var(--primary-light);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      margin: 0 auto var(--spacing-2);
    }

    .value-card h3 {
      margin-bottom: var(--spacing-1);
      font-size: 1.25rem;
    }

    .value-card p {
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .team-section {
      margin-bottom: var(--spacing-5);
    }

    .team-section h2 {
      text-align: center;
      margin-bottom: var(--spacing-4);
      position: relative;
    }

    .team-section h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: var(--primary);
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-3);
    }

    .team-member {
      background-color: var(--paper);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .team-member:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .member-image {
      height: 200px;
      overflow: hidden;
    }

    .member-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .team-member:hover .member-image img {
      transform: scale(1.05);
    }

    .team-member h3 {
      margin: var(--spacing-2) 0 4px;
      font-size: 1.1rem;
    }

    .member-title {
      color: var(--primary);
      font-weight: 500;
      margin-bottom: var(--spacing-1);
    }

    .member-bio {
      padding: 0 var(--spacing-2) var(--spacing-2);
      font-size: 0.9rem;
      color: var(--text-secondary);
    }

    .cta-section {
      background-color: var(--secondary-light);
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      text-align: center;
      color: white;
    }

    .cta-section h2 {
      color: white;
      margin-bottom: var(--spacing-1);
    }

    .cta-section p {
      margin-bottom: var(--spacing-3);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: var(--spacing-2);
    }

    .cta-buttons .btn-outline {
      border-color: white;
      color: white;
    }

    .cta-buttons .btn-outline:hover {
      background-color: white;
      color: var(--secondary);
    }

    @media (max-width: 992px) {
      .about-intro {
        grid-template-columns: 1fr;
      }

      .about-image {
        margin-bottom: var(--spacing-3);
      }
    }

    @media (max-width: 768px) {
      .cta-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class AboutComponent {}