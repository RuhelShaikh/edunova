# Library Management System

## Overview

This Library Management System is a Node.js application using MongoDB as the database. The project is designed to manage books, users, and transactions efficiently. The system includes several APIs to interact with the backend, and it has been deployed for remote testing.

## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used for storing data.
- **Postman**: Tool for API testing (for testing API endpoints).
- **Render**: Deployment platform.

## API Endpoints

**Book Routes**
GET /api/books
Fetch all books.
Response: Array of book objects.

GET /api/books/search?term=<search_term>
Search books by name or term.
Response: Array of book objects matching the search term.

GET /api/books/rent-range?min=<min_rent>&max=<max_rent>
Get books by rent price range.
Response: Array of books within the specified rent range.

GET /api/books/filter?category=<category>&term=<search_term>&minRent=<min_rent>&maxRent=<max_rent>
Filter books by category, name/term, and rent range.
Response: Array of filtered books.

GET /api/books/:bookId/transactions
Get transactions for a specific book.
Response: Object with transaction details.

GET /api/books/:bookId/total-rent
Get total rent generated by a specific book.
Response: Object with total rent amount.

**Transaction Routes**
POST /api/transactions/issue
Issue a book.
Request Body: { "bookName": "<book_name>", "userId": "<user_id>", "issueDate": "<issue_date>" }
Response: Created transaction object.

POST /api/transactions/return
Return a book.
Request Body: { "bookName": "<book_name>", "userId": "<user_id>", "returnDate": "<return_date>" }
Response: Updated transaction object with rent amount.

GET /api/transactions/date-range?startDate=<start_date>&endDate=<end_date>
Get transactions within a date range.
Response: Array of transaction objects.

**User Routes**
GET /api/users
Fetch all users.
Response: Array of user objects.

GET /api/users/:userId
Fetch a specific user by ID.
Response: User object.

## Deployment

The application has been deployed on Render. You can test the APIs using the provided endpoints.
