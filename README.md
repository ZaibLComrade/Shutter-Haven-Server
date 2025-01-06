# Shutter-Haven
# API Documentation

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Credentials](#credentials)
- [API Endpoints](#api-endpoints)
    - [Authentication Routes](#authentication-routes)
    - [User Routes](#user-routes)
    - [Product Routes](#product-routes)
    - [Cart Routes](#cart-routes)
- [Middleware](#middlewares)
- [Project Scripts](#project-scripts)
- [Notes](#notes)
---

## Introduction

The Shutter Haven Server is a backend system designed for a photography e-commerce platform. It handles user authentication, product management, and cart functionalities. The server is built with Node.js, Express, and MongoDB and uses TypeScript for static typing.

---

## Installation

1. Clone the repository:
    
    ```
    git clone https://github.com/ZaibLComrade/Shutter-Haven-Server.git
    cd shutter-haven-server
    ```
    
2. Install dependencies:
    
    ```
    npm install
    ```
    
3. Set up environment variables: Create a `.env` file in the root directory and add the following variables:
    
    ```
    PORT=5000
    MONGO_URI=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    ```
    
4. Build the application:
    
    ```
    npm run build
    ```
    

---

## Running the Application

- For production:
    
    ```
    npm start
    ```
    
- For development (with live reload):
    
    ```
    npm run dev
    ```
    

---

## Credentials
`PS: Credentials are usable on live deployment only`

### Admin
```
email: user@admin.com
password: user@admin.com
```

### Seller
```
email: user@seller.com
password: user@seller.com
```

### Buyer
```
email: user@buyer.com
password: user@buyer.com
```

---

## API Endpoints

### Base URL

```
http://localhost:<PORT>/api/v1
```

### Authentication Routes

#### Register a new user
- Endpoint: POST `/auth/register`
- Request Body:
```
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "BUYER"
}
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "BUYER"
  }
}
```

#### Login
- Endpoint: POST `/auth/login`
- Request Body:
```
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "BUYER"
  }
}
```

### User Routes

#### Get all users (Admin only)
- Endpoint: GET `/users`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Retreived users successfully"
  "users": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "BUYER"
    }
  ]
}
```

#### Update user role (Admin only)
- Endpoint: PATCH `/users/update-role/:id`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Request Body:
```
{
  "role": "SELLER"
}
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "User role updated successfully"
}
```

#### Delete a user (Admin only)
- Endpoint: POST `/users/:id`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Successfully deleted user"
}
```

### Product Routes

#### Get all products
- Endpoint: GET `/products`
- Response:
```
{
  "succcess": true,
  "statusCode": 200,
  "message": "Products retreived successfully",
  "data": []
}
```

### Get product by Id
- Endpoint: GET `/products/:id`,
- Response:
```
{
  "succcess": true,
  "statusCode": 200,
  "message": "Products retreived successfully",
  "data": []
}
```

#### Get seller specific product
- Endpoint: GET `/products?id=<Seller_ID>`
- Response:
```
{
  "succcess": true,
  "statusCode": 200,
  "message": "Products retreived successfully",
  "data": []
}
```

#### Create a product (Seller only)
- Endpoint: POST `products`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Request Body:
```
{
    "name": "Canon EOS R6 Mark II",
    "category": "Mirrorless Camera",
    "price": 2499.99,
    "currency": "USD",
    "brand": "Canon",
    "description": "A versatile full-frame mirrorless camera with advanced image stabilization and 4K video recording.",
    "specs": {
        "megapixels": 20.1,
        "sensor_type": "Full-Frame",
        "video_resolution": "4K 60fps",
        "iso_range": "100-102400",
        "weight": "680g"
    },
    "stock": 15,
    "rating": 4.8,
    "images": [
        "https://example.com/images/canon-eos-r6-1.jpg",
        "https://example.com/images/canon-eos-r6-2.jpg"
    ],
    "featured": true
}
```
- Response:
```
{
    "success": true,
    "statusCode": 200,
    "message": "Product created successfully",
    "data": {
        "createdBy": "user_id",
        "name": "Canon EOS R6 Mark II",
        "category": "Mirrorless Camera",
        "price": 2499.99,
        "currency": "USD",
        "brand": "Canon",
        "description": "A versatile full-frame mirrorless camera with advanced image stabilization and 4K video recording.",
        "specs": {
            "megapixels": 20.1,
            "sensor_type": "Full-Frame",
            "video_resolution": "4K 60fps",
            "iso_range": "100-102400",
            "weight": "680g",
            "_id": "677bd1faa3da37cb4cf52ec6"
        },
        "stock": 15,
        "rating": 4.8,
        "images": [
            "https://example.com/images/canon-eos-r6-1.jpg",
            "https://example.com/images/canon-eos-r6-2.jpg"
        ],
        "featured": true,
        "_id": "677bd1faa3da37cb4cf52ec5",
        "createdAt": "2025-01-06T12:52:10.632Z",
        "updatedAt": "2025-01-06T12:52:10.632Z",
        "__v": 0
    }
}
```

#### Update a product (Seller only)
- Endpoint: PUT `/products/:id`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Request Body:
```
{
  "price": 899.99,
  "stock": 15
}
```
- Response:
```
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "product_id",
    "name": "Professional DSLR Camera",
    "price": 899.99,
    "stock": 15
  }
}
```

#### Delete a product (Seller only)
- Endpoint: DELETE `/products/:id`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Successfully deleted product"
}
```

### Cart Routes

#### Get user cart (Buyer only)
- Endpoint: GET `/cart`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Cart retrieved successfully",
  "data": {
    "items": [
      {
        "product": {
          "_id": "product_id",
          "name": "Canon EOS R6 Mark II",
          "price": 2499.99,
          "currency": "USD",
          "images": [
            "https://example.com/images/canon-eos-r6-1.jpg"
          ]
        },
        "quantity": 1,
        "_id": "cart_item_id"
      }
    ],
    "totalAmount": 2499.99,
    "_id": "cart_id",
    "user": "user_id",
    "createdAt": "2025-01-06T12:52:10.632Z",
    "updatedAt": "2025-01-06T12:52:10.632Z"
  }
}
```

#### Add item to cart (Buyer only)
- Endpoint: POST `/cart`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Request Body:
```
{
  "productId": "product_id",
  "quantity": 1
}
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Item added to cart successfully",
  "data": {
    "items": [
      {
        "product": {
          "_id": "product_id",
          "name": "Canon EOS R6 Mark II",
          "price": 2499.99,
          "currency": "USD",
          "images": [
            "https://example.com/images/canon-eos-r6-1.jpg"
          ]
        },
        "quantity": 1,
        "_id": "cart_item_id"
      }
    ],
    "totalAmount": 2499.99,
    "_id": "cart_id",
    "user": "user_id",
    "createdAt": "2025-01-06T12:52:10.632Z",
    "updatedAt": "2025-01-06T12:52:10.632Z"
  }
}
```

#### Update cart item quantity (Buyer only)
- Endpoint: PATCH `/cart/:productId`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Request Body:
```
{
  "quantity": 2
}
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Cart updated successfully",
  "data": {
    "items": [
      {
        "product": {
          "_id": "product_id",
          "name": "Canon EOS R6 Mark II",
          "price": 2499.99,
          "currency": "USD",
          "images": [
            "https://example.com/images/canon-eos-r6-1.jpg"
          ]
        },
        "quantity": 2,
        "_id": "cart_item_id"
      }
    ],
    "totalAmount": 4999.98,
    "_id": "cart_id",
    "user": "user_id",
    "createdAt": "2025-01-06T12:52:10.632Z",
    "updatedAt": "2025-01-06T12:52:10.632Z"
  }
}
```

#### Remove item from cart (Buyer only)
- Endpoint: DELETE `/cart/:productId`
- Headers:
```
Authorization: Bearer <jwt_token>
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Item removed from cart successfully",
  "data": {
    "items": [],
    "totalAmount": 0,
    "_id": "cart_id",
    "user": "user_id",
    "createdAt": "2025-01-06T12:52:10.632Z",
    "updatedAt": "2025-01-06T12:52:10.632Z"
  }
}
```

---

## Middleware

### `verifyUser`

- Ensures the user is authenticated by validating the JWT token in the request headers.
    

### `verifyRole`

- Checks if the user has the appropriate role to access a particular endpoint. Roles include:
    
    - `ADMIN`
        
    - `SELLER`
        
    - `BUYER`
        

---

## Project Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `npm start`     | Starts the server in production mode  |
| `npm run dev`   | Starts the server in development mode |
| `npm run build` | Compiles TypeScript to JavaScript     |

---

## Notes

- This application uses **Mongoose** for MongoDB schema and database operations.
    
- The server follows RESTful design principles, making it easy to extend and integrate with other systems.
    
- Ensure to replace placeholders in the `.env` file with actual values before running the application.
    

---

For any issues or questions, feel free to contact the development team or raise an issue in the repository.
