import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'books',
    loadComponent: () => import('./features/book-list/book-list.component').then(c => c.BookListComponent)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./features/book-detail/book-detail.component').then(c => c.BookDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(c => c.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(c => c.CheckoutComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(c => c.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(c => c.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];