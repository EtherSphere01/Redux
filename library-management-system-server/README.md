# Library Management System API

A comprehensive Library Management System built with Express, TypeScript, and MongoDB.

### Live Link: https://library-management-system-api-seven.vercel.app/

## 🚀 Features

-   **Book Management**: Create, read, update, and delete books
-   **Borrowing System**: Borrow books with proper inventory management
-   **Aggregation Queries**: Get borrowing summaries with MongoDB aggregation
-   **Validation**: Comprehensive input validation using Zod
-   **Mongoose Middleware**: Pre/post hooks for business logic
-   **Static & Instance Methods**: Custom Mongoose methods for availability management

## 📋 Prerequisites

-   Node.js (v18 or higher)
-   MongoDB Atlas account or local MongoDB installation
-   npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/EtherSphere01/B5-Assignment3.git
cd B5-Assignment3
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

4. Build the project:

```bash
npm run build
```

5. Start the development server:

```bash
npm run dev
```

6. Import APIs into the Postman
   [APIs](https://github.com/EtherSphere01/B5-Assignment3/blob/main/Library%20Management%20System%20API.postman_collection.json)

## 📚 API Endpoints

### 🏠 Test Connection

```bash
curl http://localhost:5000
```

### Book Management

#### Create Book

-   **POST** `/api/books`
-   Creates a new book in the library

**Request Body:**

```json
{
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
}
```

#### Get All Books

-   **GET** `/api/books`
-   Retrieves all books with optional filtering and sorting

**Query Parameters:**

-   `filter`: Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
-   `sort`: Sort order (asc, desc)
-   `sortBy`: Sort field (default: createdAt)
-   `limit`: Number of results (default: 10)

**Example:** `/api/books?filter=SCIENCE&sort=desc&limit=5`

#### Get Book by ID

-   **GET** `/api/books/:bookId`
-   Retrieves a specific book by its ID

#### Update Book

-   **PUT** `/api/books/:bookId`
-   Updates an existing book

**Request Body:** (partial update supported)

```json
{
    "copies": 50
}
```

#### Delete Book

-   **DELETE** `/api/books/:bookId`
-   Deletes a book from the library

### Borrowing System

#### Borrow a Book

-   **POST** `/api/borrow`
-   Borrow books with automatic inventory management

**Request Body:**

```json
{
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Get Borrowed Books Summary

-   **GET** `/api/borrow`
-   Returns aggregated borrowing data

**Response:**

```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "book": {
                "title": "The Theory of Everything",
                "isbn": "9780553380163"
            },
            "totalQuantity": 5
        }
    ]
}
```

## 🔧 Validation Rules

### Book Validation

-   **title**: Required string
-   **author**: Required string
-   **genre**: Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
-   **isbn**: Required and unique string
-   **description**: Optional string
-   **copies**: Required non-negative number
-   **available**: Boolean (auto-calculated based on copies)

### Borrow Validation

-   **book**: Required valid ObjectId
-   **quantity**: Required positive number
-   **dueDate**: Required future date

## 🏗️ Architecture

### Models

-   **Book Model**: Includes validation, middleware, and instance methods
-   **Borrow Model**: References books with quantity tracking

### Controllers

-   **Book Controller**: CRUD operations with filtering and sorting
-   **Borrow Controller**: Borrowing logic and aggregation queries

### Middleware

-   **Pre-save Hook**: Automatically updates book availability based on copies
-   **Validation**: Zod schemas for request validation
-   **Error Handling**: Comprehensive error responses

### Business Logic

-   Automatic inventory management when borrowing
-   Availability updates using Mongoose instance methods
-   Aggregation pipeline for borrowing summaries

## 📝 Error Handling

The API returns consistent error responses:

```json
{
    "success": false,
    "message": "Error description",
    "error": "Detailed error information"
}
```

## 🔒 Validation Examples

### Invalid Genre

```json
{
    "message": "Validation failed",
    "success": false,
    "error": {
        "name": "ValidationError",
        "errors": [
            {
                "message": "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY"
            }
        ]
    }
}
```

### Insufficient Copies

```json
{
    "success": false,
    "message": "Insufficient copies available",
    "error": "Only 2 copies available, but 5 requested"
}
```



