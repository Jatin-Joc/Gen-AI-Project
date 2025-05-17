import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  addToCart(book: Book, quantity: number = 1): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItemIndex = currentCart.findIndex(item => item.book.id === book.id);

    let updatedCart: CartItem[];

    if (existingItemIndex > -1) {
      // Update quantity if book already in cart
      updatedCart = [...currentCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity
      };
    } else {
      // Add new item to cart
      updatedCart = [...currentCart, { book, quantity }];
    }

    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
  }

  updateCartItemQuantity(bookId: number, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.map(item => 
      item.book.id === bookId ? { ...item, quantity } : item
    );

    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
  }

  removeFromCart(bookId: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(item => item.book.id !== bookId);

    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  getCartTotal(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems$.subscribe(items => {
        const total = items.reduce((sum, item) => {
          const itemPrice = item.book.discountPercentage
            ? item.book.price * (1 - item.book.discountPercentage / 100)
            : item.book.price;
          return sum + (itemPrice * item.quantity);
        }, 0);
        observer.next(total);
      });
    });
  }

  getCartCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems$.subscribe(items => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        observer.next(count);
      });
    });
  }

  private saveCartToLocalStorage(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}