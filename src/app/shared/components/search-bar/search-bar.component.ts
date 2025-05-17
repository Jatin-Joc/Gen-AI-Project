import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <form (submit)="onSearch($event)">
        <input 
          type="text" 
          placeholder="Search books, authors, or categories..." 
          [(ngModel)]="searchTerm" 
          name="search" 
          class="search-input"
        >
        <button type="submit" class="search-button">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
  `,
  styles: [`
    .search-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    form {
      display: flex;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 12px 48px 12px 16px;
      border-radius: var(--radius-md);
      border: 1px solid var(--divider);
      font-family: var(--font-body);
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(139, 38, 53, 0.2);
    }

    .search-button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background: var(--primary);
      border: none;
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 0 16px;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .search-button:hover {
      background-color: var(--primary-light);
    }
  `]
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm = '';

  onSearch(event: Event): void {
    event.preventDefault();
    this.search.emit(this.searchTerm);
  }
}