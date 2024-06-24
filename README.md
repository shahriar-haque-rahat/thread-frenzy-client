# Thread Frenzy
Thread Frenzy is a Full stack E-Commerce website built with MERN (MongoDB, Express.js, React.js, Node.js) stack. Thread Frenzy offers a seamless shopping experience with secure authentication, dynamic product exploration, and smooth Stripe-integrated checkout.

## Features:

### Authentication
  - Firebase authentication with email/password, Google, and GitHub login.
  - Restricted access to private routes for non-logged-in users.
  - Handling of invalid user credentials.

### Product Collection Page
  - Separate pages for men’s and women’s collections.
  - Pagination for easy navigation through products.
  - Dynamic filtering by brand, price, and size.

### Product Details Page
  - Detailed view of each product.
  - Options to select color, size, and quantity.
  - Add products to the cart or wishlist.
  - User reviews with dynamic average rating display.
  - Slider showcasing related products.

### Cart Management
  - Add products to the cart.
  - Adjust item quantities.
  - Delete single or multiple items from the cart.

### Payment System
  - Seamless Stripe payment integration.
  - Confirmation of personal information and address during checkout.

### Contact Us
  - Message sending functionality for users.

### User Dashboard
#### Account Management
  - Update personal information (name, email, phone number, photo, address).
#### Wishlist Management
  - View and manage bookmarked products.
#### Order History
  - Review detailed order history.

### Admin Dashboard
#### Sales Overview
  - Graphs showing total sold quantity and price, gender-specific product sales, monthly user count, and more.
#### Manage Products
  - List of all products with options to edit, delete, and add new products.
  - Filtering by price, gender, and brand.
#### Manage Orders
  - View and update order status.
#### Manage Users
  - View and manage admin and user roles, including banning and unbanning users.
#### Messages
  - Access to sent messages.
#### Account Management
  - Update personal information (name, email, phone number, photo, address).

## Technologies Used
- MERN Stack (MongoDB, Express.js, React.js, Node.js)
- Firebase Authentication (Email, Password, Gmail login)
- Stripe Payment Integration

## Running Locally

To run **Thread Frenzy** locally, follow these steps:

### 1. Clone the Repository
- Open your terminal and run:
  ```bash
  git clone <repository-url>
  cd thread-frenzy
  ```

### 2. Set Up the Server
- Navigate to the server directory:
  ```bash
  cd server
  ```
- Install server dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file in the server directory and add your environment variables (e.g., MongoDB URI, Stripe keys, Firebase credentials).
- Start the server:
  ```bash
  npm start
  ```

### 3. Set Up the Client
- Navigate to the client directory:
  ```bash
  cd ../client
  ```
- Install client dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file in the client directory and add your environment variables (e.g., API endpoint, Firebase configuration).
- Start the client:
  ```bash
  npm start
  ```

### 4. Access the Application
- Open your browser and navigate to:
  ```bash
  http://localhost:3000
  ```
- The server should be running on:
  ```bash
  http://localhost:5000
  ```

By following these steps, you'll have **Thread Frenzy** running locally on your machine.

