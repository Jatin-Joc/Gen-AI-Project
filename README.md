# Angular Bookstore Frontend

This is an Angular 16 e-commerce bookstore frontend application. It allows users to browse, search, and filter books, add them to a cart, and proceed through a checkout process. The project demonstrates modern Angular best practices, including standalone components, lazy loading, and reactive forms.

## Features
- Browse books by category, price, and special offers
- Search for books by title, author, or category
- View detailed information for each book
- Add books to a shopping cart
- Checkout with a summary of selected books
- Responsive and modern UI

## Project Structure
```
project/
  src/
    app/
      core/
        models/         # TypeScript interfaces for data models
        services/       # Angular services for data and cart management
      features/
        about/          # About page
        book-detail/    # Book detail view
        book-list/      # Book list and filters
        cart/           # Shopping cart
        checkout/       # Checkout process
        contact/        # Contact page
        home/           # Home/landing page
      shared/
        components/     # Reusable UI components (book card, search bar, etc.)
    global_styles.css   # Global styles
    main.ts            # App bootstrap
    index.html         # Main HTML file
  package.json         # Project dependencies
  angular.json         # Angular CLI config
  tsconfig.json        # TypeScript config
```

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm (v9 or later)
- Angular CLI (`npm install -g @angular/cli`)

### Installation
1. Clone the repository or extract the project files.
2. Navigate to the `project` directory:
   ```sh
   cd project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application
Start the development server:
```sh
ng serve
```
The app will be available at [http://localhost:4200](http://localhost:4200).

### Building for Production
```sh
ng build
```
The production-ready files will be in the `dist/` directory.

## Notes
- This project uses Angular standalone components and lazy loading for optimal performance.
- Mock data is provided in `src/app/core/services/book.service.ts`.
- No backend/API is required for demo purposes.

## License
This project is for educational/demo purposes only.
