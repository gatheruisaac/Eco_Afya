# Eco Afya 🌱

Eco Afya is a React-based web application that helps users make more informed food choices by combining nutritional, health, and environmental information in one place.

The application uses data from the Open Food Facts API to allow users to explore food products, view nutritional information, check sustainability scores, and save their favorite products.

## Features

- 🌱 Browse food products from Open Food Facts
- 🔎 View detailed information about individual products
- 🥗 View nutritional information including:
  - Energy
  - Sugars
  - Fat
  - Protein
  - Salt
  - Carbohydrates
- 🌍 View Nutri-Score and Eco-Score information
- ❤️ Save favorite products using local storage
- 📝 Create and manage personal food logs
- 👤 User authentication pages
- 📱 Responsive design for desktop, tablet, and mobile devices
- ⚠️ Loading and error states for API requests
- 🧭 Client-side navigation using React Router

## Technologies Used

- React
- Vite
- JavaScript
- CSS
- React Router
- Open Food Facts API
- Local Storage
- Vercel

## API

Eco Afya uses the Open Food Facts API to retrieve food product information.

Open Food Facts provides information about food products, including product names, brands, ingredients, nutritional values, Nutri-Score, and Eco-Score.

API website:

https://world.openfoodfacts.org/

## API Endpoints

The Flask backend exposes the following endpoints. All request/response bodies are JSON.

> Paths below follow standard REST conventions for this project's blueprints (auth, favorites, products). Double-check each path against your actual Flask route definitions and update as needed.

### Auth (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user (email, password) | No |
| POST | `/api/auth/login` | Log in and receive a JWT access token | No |
| GET | `/api/auth/me` | Get the currently authenticated user's profile | Yes (JWT) |

### Favorites (`/api/favorites`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/favorites?page=1&per_page=10` | List the current user's favorites (paginated) | Yes (JWT) |
| POST | `/api/favorites` | Add a product to favorites (product id/barcode, notes, rating) | Yes (JWT) |
| GET | `/api/favorites/:id` | Get a single favorite entry | Yes (JWT) |
| PATCH | `/api/favorites/:id` | Update a favorite (e.g. notes, rating) | Yes (JWT) |
| DELETE | `/api/favorites/:id` | Remove a favorite | Yes (JWT) |

Favorites are scoped to the authenticated user — a user can only view, edit, or delete their own favorites.

### Products (`/api/products`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/products?q=:query` | Search/proxy product data from Open Food Facts | No |
| GET | `/api/products/:barcode` | Get details for a single product by barcode | No |

## Project Structure

```text
Eco_Afya/
├── api/
│   └── products.js
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── FoodLogs.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gatheruisaac/Eco_Afya.git
```

### 2. Navigate into the project

```bash
cd Eco_Afya
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Main Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/products` | Browse food products |
| `/products/:barcode` | View detailed product information |
| `/favorites` | View saved favorite products |
| `/foodlogs` | Create and view food logs |
| `/about` | Learn more about Eco Afya |
| `/login` | User login |
| `/signup` | User registration |

## Favorites

Favorite products are stored in the browser using Local Storage.

This allows users to save products and access their favorites without requiring a database.

## Food Logs

The Food Logs feature allows users to record foods they have consumed and keep track of their food choices.

Users can add information such as:

- Food name
- Date
- Meal
- Rating
- Notes

Users can also delete existing food log entries.

## Error Handling

Eco Afya includes loading and error states when communicating with external APIs.

If product information cannot be retrieved, users are shown an appropriate error message instead of a broken page.

## Responsive Design

The application is designed to work across different screen sizes.

Responsive layouts are provided for:

- Desktop
- Tablet
- Mobile

## Deployment

Eco Afya is deployed using Vercel.

Live application:

https://eco-afya.vercel.app/

## Purpose

The goal of Eco Afya is to make food information easier to understand by presenting nutritional and environmental information together.

Instead of looking only at calories or nutritional values, users can consider both their health and the environmental impact of their food choices.

## Future Improvements

Possible future improvements include:

- User accounts with persistent cloud storage
- More advanced food search and filtering
- Product comparison functionality
- Personalized nutrition recommendations
- Food consumption statistics and charts
- Improved authentication and backend data storage

## Author

**Isaac Gatheru Kanyua**

Built as a Moringa School Phase 2 React project