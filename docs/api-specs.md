# Mitumba Online – REST API Specification
**Version:** 1.0.0  
**Date:** 22 March 2026  
**Project:** Cloud-Native Microservices Marketplace

## Authentication
All protected routes require JWT Bearer Token:


## 1. User Service (Port 3001)
| Method | Endpoint                | Description                        | Auth | Status |
|--------|-------------------------|------------------------------------|------|--------|
| POST   | `/api/auth/register`    | Register buyer or vendor           | No   | 201    |
| POST   | `/api/auth/login`       | Login and receive JWT              | No   | 200    |
| GET    | `/api/auth/profile`     | Get current user profile           | Yes  | 200    |
| PUT    | `/api/auth/profile`     | Update profile                     | Yes  | 200    |

## 2. Product Service (Port 3002)
| Method | Endpoint                  | Description                                      | Auth | Status |
|--------|---------------------------|--------------------------------------------------|------|--------|
| POST   | `/api/products`           | Create new mitumba product (vendor only)         | Yes  | 201    |
| GET    | `/api/products`           | Search products (public) with filters            | No   | 200    |
| GET    | `/api/products/:id`       | Get single product                               | No   | 200    |
| PUT    | `/api/products/:id`       | Update product (vendor only)                     | Yes  | 200    |
| DELETE | `/api/products/:id`       | Delete product                                   | Yes  | 204    |

**Example Query:**  
`/api/products?condition=Used&size=M&minPrice=5000&maxPrice=25000`

## 3. Order Service (Port 3003)
| Method | Endpoint                     | Description                                      | Auth | Status |
|--------|------------------------------|--------------------------------------------------|------|--------|
| POST   | `/api/orders`                | Place new order                                  | Yes  | 201    |
| GET    | `/api/orders`                | Get buyer’s orders                               | Yes  | 200    |
| GET    | `/api/orders/:id`            | Track order status                               | Yes  | 200    |
| PATCH  | `/api/orders/:id/status`     | Update order status (vendor)                     | Yes  | 200    |

## Database Schemas (Mongoose)

**User Schema** (`user-service/src/models/User.js`)
```js
{
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['buyer', 'vendor'] },
  phone: String,
  address: String
}