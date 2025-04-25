# API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication
Most endpoints require JWT authentication. Add the token to your requests:
```
Authorization: Bearer <your_jwt_token>
```

---

# Product API Endpoints

## 1. Get All Products
```http
GET /products
```
Query Parameters:
- `category` (optional): Filter by category
- `brand` (optional): Filter by brand
- `price` (optional): Filter by maximum price

Example:
```http
GET /products?category=Phone&brand=Apple&price=1000
```

## 2. Get Single Product
```http
GET /products/:slug
```
Example:
```http
GET /products/iphone-14
```

## 3. Create Product (Admin only)
```http
POST /products
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
Body:
- `name` (required): string
- `description` (required): string
- `price` (required): number
- `category` (required): enum ['Phone', 'Computers', 'Smartwatch', 'Camera', 'Headphones', 'Gaming', 'Other']
- `brand` (required): string
- `stock` (required): number
- `images` (required): file(s) (up to 10 images)

## 4. Update Product (Admin only)
```http
PATCH /products/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
Body: Any product fields you want to update, including new images.

Example:
```json
{
    "price": 899,
    "stock": 45,
    "images": [file1, file2]
}
```

## 5. Delete Product (Admin only)
```http
DELETE /products/:id
Authorization: Bearer <token>
```

## 6. Add Product Review
```http
POST /products/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json
```
Body:
```json
{
    "comment": "Great product!",
    "rating": 5
}
```

## 7. Get Product Reviews
```http
GET /products/:id/reviews
```

---

# User API Endpoints

## 1. User Signup
```http
POST /user/signup
Content-Type: application/json
```
Body:
```json
{
    "email": "user@example.com",
    "password": "StrongPass123!",
    "name": "John Doe",
    "role": "user"
}
```

## 2. User Login
```http
POST /user/login
Content-Type: application/json
```
Body:
```json
{
    "email": "user@example.com",
    "password": "StrongPass123!"
}
```

## 3. Get All Users (Admin only)
```http
GET /user
Authorization: Bearer <token>
```

## 4. Search Users (Admin only)
```http
GET /user/search?query=<search_term>
Authorization: Bearer <token>
```
Example:
```http
GET /user/search?query=admin
```

## 5. Delete User (Super Admin only)
```http
DELETE /user/:id
Authorization: Bearer <token>
```

## 6. Password Reset Request
```http
POST /user/forgot-password
Content-Type: application/json
```
Body:
```json
{
    "email": "user@example.com"
}
```

## 7. Reset Password
```http
POST /user/reset-password
Content-Type: application/json
```
Body:
```json
{
    "token": "reset_token_received_via_email",
    "newPassword": "NewStrongPass123!"
}
```

## 8. Update User Profile
```http
PATCH /user/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
Body:
- `name` (optional): string
- `image` (optional): file (profile image)

Example:
```http
PATCH /user/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data
```
Form-data:
- `name`: "Jane Doe"
- `image`: (upload a file)

---

# Testing in Postman

1. **Create a Postman Collection**
   - Open Postman
   - Create a new collection called "E-commerce API"
   - Create folders for "Products" and "Users"

2. **Set up Environment Variables**
   - Create a new environment
   - Add variables:
     - `BASE_URL`: http://localhost:4000/api
     - `TOKEN`: (leave empty initially)

3. **Authentication Flow**
   1. Create a user using the signup endpoint
   2. Login with the created user
   3. Copy the token from the response
   4. Set the token in your environment variable

4. **Testing Protected Routes**
   - Make sure to include the Authorization header:
   ```
   Authorization: Bearer {{TOKEN}}
   ```

5. **Testing File Uploads**
   - Use form-data in Postman
   - Set the key type to "File" for image uploads

Example Postman Test Sequence:
1. Create user (POST /user/signup)
2. Login (POST /user/login)
3. Update profile (PATCH /user/profile)
4. Create product (POST /products)
5. Get all products (GET /products)
6. Add review (POST /products/:id/reviews)
7. Get product reviews (GET /products/:id/reviews)







# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
