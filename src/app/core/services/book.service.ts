import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book, Category } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly mockBooks: Book[] = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 24.99,
      coverImage: "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
      category: "Mystery",
      rating: 4.5,
      publicationDate: "2019-02-05",
      publisher: "Celadon Books",
      pages: 336,
      isbn: "978-1250301697",
      featured: true,
      bestseller: true
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      price: 19.99,
      coverImage: "https://images.pexels.com/photos/4855439/pexels-photo-4855439.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
      category: "Biography",
      rating: 4.8,
      publicationDate: "2018-02-20",
      publisher: "Random House",
      pages: 352,
      isbn: "978-0399590504",
      featured: true
    },
    {
      id: 3,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      price: 21.99,
      coverImage: "https://images.pexels.com/photos/3747507/pexels-photo-3747507.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.",
      category: "Fiction",
      rating: 4.7,
      publicationDate: "2018-08-14",
      publisher: "G.P. Putnam's Sons",
      pages: 384,
      isbn: "978-0735219090",
      bestseller: true
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      price: 18.99,
      coverImage: "https://images.pexels.com/photos/4466381/pexels-photo-4466381.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      category: "Self-Help",
      rating: 4.9,
      publicationDate: "2018-10-16",
      publisher: "Avery",
      pages: 320,
      isbn: "978-0735211292",
      featured: true,
      bestseller: true
    },
    {
      id: 5,
      title: "The Overstory",
      author: "Richard Powers",
      price: 22.99,
      coverImage: "https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "The Overstory is a sweeping, impassioned work of activism and resistance that is also a stunning evocation of—and paean to—the natural world. From the roots to the crown and back to the seeds, Richard Powers's twelfth novel unfolds in concentric rings of interlocking fables that range from antebellum New York to the late twentieth-century Timber Wars of the Pacific Northwest and beyond.",
      category: "Fiction",
      rating: 4.4,
      publicationDate: "2018-04-03",
      publisher: "W. W. Norton & Company",
      pages: 502,
      isbn: "978-0393635522"
    },
    {
      id: 6,
      title: "Becoming",
      author: "Michelle Obama",
      price: 26.99,
      coverImage: "https://images.pexels.com/photos/5834344/pexels-photo-5834344.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era. As First Lady of the United States of America—the first African American to serve in that role—she helped create the most welcoming and inclusive White House in history.",
      category: "Biography",
      rating: 4.7,
      publicationDate: "2018-11-13",
      publisher: "Crown",
      pages: 448,
      isbn: "978-1524763138",
      bestseller: true
    },
    {
      id: 7,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      price: 23.99,
      coverImage: "https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be \"human.\"",
      category: "History",
      rating: 4.6,
      publicationDate: "2015-02-10",
      publisher: "Harper",
      pages: 464,
      isbn: "978-0062316097",
      featured: true
    },
    {
      id: 8,
      title: "The Nightingale",
      author: "Kristin Hannah",
      price: 20.99,
      coverImage: "https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "With courage, grace, and powerful insight, bestselling author Kristin Hannah captures the epic panorama of World War II and illuminates an intimate part of history seldom seen: the women's war.",
      category: "Historical Fiction",
      rating: 4.8,
      publicationDate: "2015-02-03",
      publisher: "St. Martin's Press",
      pages: 440,
      isbn: "978-0312577223"
    },
    {
      id: 9,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      price: 25.99,
      coverImage: "https://images.pexels.com/photos/3072046/pexels-photo-3072046.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
      category: "Psychology",
      rating: 4.5,
      publicationDate: "2011-10-25",
      publisher: "Farrar, Straus and Giroux",
      pages: 499,
      isbn: "978-0374275631",
      discountPercentage: 15
    },
    {
      id: 10,
      title: "The Dutch House",
      author: "Ann Patchett",
      price: 19.99,
      coverImage: "https://images.pexels.com/photos/6373307/pexels-photo-6373307.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "At the end of the Second World War, Cyril Conroy combines luck and a single canny investment to begin an enormous real estate empire, propelling his family from poverty to enormous wealth. His first order of business is to buy the Dutch House, a lavish estate in the suburbs outside of Philadelphia.",
      category: "Fiction",
      rating: 4.3,
      publicationDate: "2019-09-24",
      publisher: "Harper",
      pages: 352,
      isbn: "978-0062963673",
      discountPercentage: 10
    }
  ];

  private readonly categories: Category[] = [
    { id: 'fiction', name: 'Fiction', icon: 'fa-book' },
    { id: 'mystery', name: 'Mystery', icon: 'fa-magnifying-glass' },
    { id: 'biography', name: 'Biography', icon: 'fa-user' },
    { id: 'self-help', name: 'Self-Help', icon: 'fa-hand-holding-heart' },
    { id: 'history', name: 'History', icon: 'fa-landmark' },
    { id: 'historical-fiction', name: 'Historical Fiction', icon: 'fa-landmark' },
    { id: 'psychology', name: 'Psychology', icon: 'fa-brain' }
  ];

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return of(this.mockBooks);
  }

  getFeaturedBooks(): Observable<Book[]> {
    return of(this.mockBooks.filter(book => book.featured));
  }

  getBestsellers(): Observable<Book[]> {
    return of(this.mockBooks.filter(book => book.bestseller));
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return of(this.mockBooks.filter(book => 
      book.category.toLowerCase() === category.toLowerCase()
    ));
  }

  getBook(id: number): Observable<Book | undefined> {
    return of(this.mockBooks.find(book => book.id === id));
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  searchBooks(term: string): Observable<Book[]> {
    term = term.toLowerCase().trim();
    return of(this.mockBooks.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term)
    ));
  }
}