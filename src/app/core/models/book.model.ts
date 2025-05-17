export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  rating: number;
  publicationDate: string;
  publisher: string;
  pages: number;
  isbn: string;
  featured?: boolean;
  bestseller?: boolean;
  discountPercentage?: number;
  reviews?: Review[];
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}