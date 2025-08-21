🚗 Vroomo – Car Rental Web Application

Vroomo is a full-stack MERN application designed for seamless car rental management with role-based authentication, powerful booking management, and advanced filtering features.

✨ Features
🔐 Authentication & Authorization

Role-based authentication using JWT (JSON Web Tokens).

Two user roles:

Owner → Access to /owner-dashboard.

Renter → Access to /.

Protected routes: only authenticated users can access dashboards and bookings.

👤 User (Renter) Features

Register / Login with JWT authentication.

Book cars (cannot book the same car on the same day twice).

View booking details including:

Status (Booked, Cancelled, Confirmed).

Booking date.

Total price.

Update personal profile information.

Browse available cars and filter by:

Category → SUV, Sedan, Hatchback, etc.

Fuel Type → Petrol, Diesel, Electric, Hybrid.

🚘 Owner Features

Register / Login as Owner.

Add new cars with details (name, brand, price, category, fuel type, etc.).

Upload car images with Multer + Cloudinary integration.

Update existing car details (image, price, specs).

Delete cars from inventory.

Manage all bookings:

View all renters’ bookings.

Update booking status (Confirmed / Cancelled).

Update personal profile information.

🛠️ Tech Stack
Frontend:

React.js with React Router v6 for navigation.

Redux Toolkit with createAsyncThunk for global state management and optimized API calls.

shadcn/ui for modern UI components.

AOS (Animate on Scroll) for smooth animations.

Fully responsive design across devices.

Backend:

Node.js + Express.js.

MongoDB with Mongoose for database management.

JWT Authentication for secure login.

Multer + Cloudinary for image upload and storage.

⚙️ Other Functionalities

Prevent duplicate booking of the same car on the same date.

Efficient API handling with Redux createAsyncThunk (avoid unnecessary API calls).

Separate dashboards for Owners and Renters.

Fully responsive layout with animations.
