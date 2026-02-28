.

🛒 Full Stack E-Commerce Web Application

A  full stack E-Commerce Web Application built using:

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB Atlas
This project implements a complete online shopping workflow including product listing, product details, shopping cart, checkout system, order management, and user authentication.

🚀 Live Features

👤 Authentication
User Registration
User Login
Password Hashing using bcrypt
JWT-based Authentication
Protected routes

🛍 Product Management
Dynamic product listing (fetched from MongoDB)
Product details page
Product images served using Express static middleware
Search functionality

🛒 Shopping Cart
Add to cart (database-based)
Quantity management
Remove items from cart
Real-time cart count update

💳 Checkout & Orders
Payment method selection (UPI / Card UI)
Order creation in MongoDB
Cart auto-clear after successful order
Order success page
Order history page

🛠 Tech Stack

Frontend

HTML5
CSS3
Vanilla JavaScript
Responsive UI
LocalStorage for session handling

Backend
Node.js
Express.js
MongoDB Atlas (Cloud Database)
Mongoose (ODM)
bcryptjs (Password Hashing)
jsonwebtoken (JWT)
dotenv (Environment Variables)
cors

📂 Project Structure
ecommerce/
│
├── frontend/
│   ├── index.html
│   ├── product.html
│   ├── cart.html
│   ├── checkout.html
│   ├── success.html
│   ├── orders.html
│   ├── login.html
│   ├── register.html
│   ├── script.js
│   ├── style.css
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── public/
│   │   └── images/
│   ├── .env
│   └── package.json

🚀 Future Improvements

Admin dashboard for product management
Razorpay / Stripe real payment integration
Payment verification
Address management
Product reviews system
Deployment on Render / Vercel
Docker support

🎯 Purpose of This Project
This project was built to demonstrate:
Full Stack Development skills
Real-world E-Commerce architecture
Backend API design
Database modeling
Authentication & authorization
Frontend–Backend integration

👨‍💻 Author
Ranu Vinod Patidar
Full Stack Developer (Learning & Building)
