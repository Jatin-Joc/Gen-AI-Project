import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact-page">
      <div class="container">
        <div class="page-header">
          <h1>Contact Us</h1>
          <p class="subtitle">We'd love to hear from you! Get in touch with our team.</p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <h3>Visit Us</h3>
              <p>123 Book Street<br>Reading, CA 94567<br>United States</p>
            </div>
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-phone"></i>
              </div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567<br>Mon-Fri: 9AM - 6PM</p>
            </div>
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p>info@bookhaven.com<br>support@bookhaven.com</p>
            </div>
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-comments"></i>
              </div>
              <h3>Live Chat</h3>
              <p>Available 7 days a week<br>10AM - 8PM EST</p>
            </div>
          </div>

          <div class="contact-form-container">
            <h2>Send Us a Message</h2>
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="name">Your Name *</label>
                <input type="text" id="name" formControlName="name">
                <div 
                  *ngIf="submitted && contactForm.get('name')?.errors?.['required']" 
                  class="error-message">
                  Name is required
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" formControlName="email">
                <div 
                  *ngIf="submitted && contactForm.get('email')?.errors?.['required']" 
                  class="error-message">
                  Email is required
                </div>
                <div 
                  *ngIf="submitted && contactForm.get('email')?.errors?.['email']" 
                  class="error-message">
                  Please enter a valid email
                </div>
              </div>

              <div class="form-group">
                <label for="subject">Subject *</label>
                <input type="text" id="subject" formControlName="subject">
                <div 
                  *ngIf="submitted && contactForm.get('subject')?.errors?.['required']" 
                  class="error-message">
                  Subject is required
                </div>
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  formControlName="message" 
                  rows="6"
                  placeholder="How can we help you?"></textarea>
                <div 
                  *ngIf="submitted && contactForm.get('message')?.errors?.['required']" 
                  class="error-message">
                  Message is required
                </div>
              </div>

              <div class="form-group">
                <div class="checkbox-field">
                  <input type="checkbox" id="newsletter" formControlName="newsletter">
                  <label for="newsletter">Subscribe to our newsletter for updates on new releases and promotions</label>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>

        <div class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h3>How long does shipping take?</h3>
              <p>Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery.</p>
            </div>
            <div class="faq-item">
              <h3>What is your return policy?</h3>
              <p>Books can be returned within 30 days of delivery for a full refund if they are in their original condition.</p>
            </div>
            <div class="faq-item">
              <h3>Do you ship internationally?</h3>
              <p>Yes, we ship to select countries worldwide. International shipping typically takes 7-14 business days.</p>
            </div>
            <div class="faq-item">
              <h3>Can I track my order?</h3>
              <p>Yes, you'll receive a tracking number via email once your order ships.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-page {
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

    .contact-content {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-5);
    }

    .contact-info {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-3);
    }

    .info-card {
      background-color: var(--paper);
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .info-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .info-icon {
      width: 50px;
      height: 50px;
      background-color: var(--primary-light);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin-bottom: var(--spacing-2);
    }

    .info-card h3 {
      margin-bottom: var(--spacing-1);
      font-size: 1.25rem;
    }

    .info-card p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .contact-form-container {
      background-color: var(--paper);
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }

    .contact-form-container h2 {
      margin-bottom: var(--spacing-3);
      position: relative;
    }

    .contact-form-container h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--primary);
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
    .form-group textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--divider);
      border-radius: var(--radius-sm);
      font-family: var(--font-body);
      transition: border-color 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(139, 38, 53, 0.2);
    }

    .checkbox-field {
      display: flex;
      align-items: flex-start;
    }

    .checkbox-field input {
      width: auto;
      margin-right: 8px;
      margin-top: 4px;
    }

    .checkbox-field label {
      font-weight: normal;
      flex: 1;
    }

    .error-message {
      color: var(--error);
      font-size: 0.8rem;
      margin-top: 4px;
    }

    .faq-section {
      margin-bottom: var(--spacing-5);
    }

    .faq-section h2 {
      text-align: center;
      margin-bottom: var(--spacing-4);
      position: relative;
    }

    .faq-section h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: var(--primary);
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-3);
    }

    .faq-item {
      background-color: var(--paper);
      padding: var(--spacing-3);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .faq-item:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }

    .faq-item h3 {
      margin-bottom: var(--spacing-1);
      font-size: 1.1rem;
      color: var(--secondary);
    }

    .faq-item p {
      color: var(--text-secondary);
      line-height: 1.5;
    }

    @media (max-width: 992px) {
      .contact-content {
        grid-template-columns: 1fr;
      }

      .contact-info {
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: var(--spacing-3);
      }
    }

    @media (max-width: 768px) {
      .contact-info {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      newsletter: [false]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.valid) {
      // In a real application, this would send the form data to a backend service
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm.reset();
      this.submitted = false;
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}