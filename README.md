# Eco Afya 🌱

Eco Afya is a full-stack web application that helps users make more informed and sustainable food choices by combining nutritional, health, and environmental information in one place.

The application allows users to explore food products using data from the Open Food Facts API, view nutritional and sustainability information, save favorite products, and maintain personal food logs.

Eco Afya is a full-stack application using **React on the frontend, Flask on the backend, and PostgreSQL for persistent data storage**. User authentication and ownership controls ensure that users can only access and manage their own personal records.

---

## Features

* 🌱 Browse food products from Open Food Facts
* 🔎 View detailed information about individual products
* 🥗 View nutritional information including:

  * Energy
  * Sugars
  * Fat
  * Protein
  * Salt
  * Carbohydrates
* 🌍 View Nutri-Score and Eco-Score information
* ❤️ Save favorite products
* 📝 Create and manage personal food logs
* 👤 User registration and login
* 🔐 Session-based authentication
* 🛡️ User ownership protection for personal records
* ✏️ Create, read, update, and delete food log records
* 🗑️ Delete personal food log entries
* 📄 Paginated backend data retrieval
* ⚠️ Loading and error states
* 🧭 Client-side navigation using React Router
* 📱 Responsive design for desktop, tablet, and mobile devices
* 🌐 RESTful Flask API
* 🗄️ PostgreSQL database for persistent user and food-log data

---

# Technologies Used

## Frontend

* React
* Vite
* JavaScript
* CSS
* React Router
* Fetch API
* Local Storage

## Backend

* Python
* Flask
* Flask-SQLAlchemy
* Flask-Migrate
* Flask-Bcrypt
* Flask-CORS
* RESTful API

## Database

* PostgreSQL
* SQLAlchemy ORM

## External API

* Open Food Facts API

## Deployment

* Vercel — React frontend
* Render — Flask backend
* PostgreSQL — persistent database

---

# System Architecture

Eco Afya follows a full-stack client-server architecture.

```text
                    ┌──────────────────────┐
                    │      User / Browser  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      Vite            │
                    └──────────┬───────────┘
                               │
                 HTTP Requests / JSON Responses
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Flask Backend     │
                    │     REST API         │
                    └───────┬───────┬──────┘
                            │       │
                ┌───────────┘       └─────────────┐
                ▼                                 ▼
       ┌──────────────────┐              ┌──────────────────┐
       │   PostgreSQL     │              │ Open Food Facts  │
       │    Database      │              │       API        │
       └──────────────────┘              └──────────────────┘
```

The React frontend communicates with the Flask backend using HTTP requests. The Flask backend handles authentication, database operations, authorization, and communication with external services.

---

# Project Structure

The project is organized into separate frontend and backend applications.

```text
Eco_Afya/
│
├── api/
│   └── products.js
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── FoodLogs.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── About.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   └── routes.py
│   │
│   ├── migrations/
│   │   └── versions/
│   │
│   ├── instance/
│   │
│   ├── .env
│   ├── config.py
│   ├── run.py
│   └── requirements.txt
│
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
└── README.md
```

---

# Backend Structure

The Flask backend is located inside the `server/` directory.

### `server/app/__init__.py`

Creates and configures the Flask application.

It initializes the application extensions, database, authentication functionality, CORS configuration, and routes.

### `server/app/models.py`

Contains the SQLAlchemy database models.

The application uses relational database resources including:

* Users
* Food Logs

Users are related to their food log records.

### `server/app/routes.py`

Contains the Flask REST API routes.

The routes handle:

* User registration
* User login
* User logout
* Authentication checks
* Food log creation
* Food log retrieval
* Food log updates
* Food log deletion
* Ownership authorization

### `server/migrations/`

Contains database migration files generated using Flask-Migrate.

This allows database schema changes to be tracked and applied safely.

---

# Authentication

Eco Afya implements user authentication using **Flask sessions**.

Users can:

1. Create an account.
2. Log in using their email and password.
3. Maintain an authenticated session.
4. Access protected features.
5. Log out of the application.

Passwords are not stored as plain text. Passwords are hashed using **Flask-Bcrypt** before being stored in the database.

The backend verifies the password hash during login.

---

# Authorization and Ownership

Personal food-log data is protected by user ownership.

Each food log belongs to a specific authenticated user.

The backend verifies the authenticated user's identity before allowing access to protected resources.

This prevents one user from:

* Viewing another user's food logs
* Updating another user's food logs
* Deleting another user's food logs

Authorization is enforced on the **backend**, rather than relying only on frontend restrictions.

---

# REST API Endpoints

The Flask backend exposes RESTful API endpoints.

## Authentication

| Method | Endpoint  | Description               | Authentication |
| ------ | --------- | ------------------------- | -------------- |
| POST   | `/signup` | Create a new user account | No             |
| POST   | `/login`  | Authenticate a user       | No             |
| POST   | `/logout` | End the current session   | Yes            |

---

## Food Logs

Food logs are associated with the currently authenticated user.

| Method | Endpoint          | Description                   | Authentication |
| ------ | ----------------- | ----------------------------- | -------------- |
| GET    | `/food-logs`      | Retrieve the user's food logs | Yes            |
| POST   | `/food-logs`      | Create a new food log         | Yes            |
| PATCH  | `/food-logs/<id>` | Update a food log             | Yes            |
| DELETE | `/food-logs/<id>` | Delete a food log             | Yes            |

Food log records are ownership-protected so that users can only modify their own records.

---

# CRUD Functionality

Eco Afya implements full CRUD functionality for the application's relational resources.

### Create

Authenticated users can create new food-log records.

### Read

Authenticated users can retrieve their own food logs.

### Update

Authenticated users can update their own food-log information.

### Delete

Authenticated users can delete their own food-log records.

The backend uses SQLAlchemy to perform database operations.

---

# Pagination

The backend supports pagination for relevant GET requests.

Pagination allows the application to retrieve records in smaller groups rather than loading all records at once.

Example:

```text
GET /food-logs?page=1&per_page=10
```

This improves performance and allows the application to scale as the number of records increases.

---

# Open Food Facts API

Eco Afya integrates with the Open Food Facts API to retrieve food-product information.

Open Food Facts provides information including:

* Product names
* Brands
* Ingredients
* Nutritional values
* Nutri-Score
* Eco-Score
* Product images

The frontend retrieves product information through the application's API layer.

The application uses a Vercel serverless API endpoint to proxy Open Food Facts requests in the deployed frontend.

---

# Products API

The application exposes a product endpoint:

```text
GET /api/products
```

This endpoint retrieves product information from Open Food Facts and returns the relevant product data as JSON.

Example response structure:

```json
{
  "products": [
    {
      "code": "3760049790214",
      "product_name": "Pain De Mie Bio",
      "brands": "La Boulangère",
      "nutriscore_grade": "c",
      "ecoscore_grade": "a-plus"
    }
  ]
}
```

---

# Favorites

Users can save products as favorites.

Favorite products are stored in browser Local Storage.

The Local Storage key used by the application is:

```text
ecoAfyaFavorites
```

This allows users to save products without requiring every favorite-product action to be stored in the PostgreSQL database.

---

# Food Logs

The Food Logs feature allows authenticated users to record foods they have consumed.

Users can record information such as:

* Food name
* Date
* Meal
* Rating
* Notes

Users can view their food logs and manage their own records.

The backend stores food-log information persistently in PostgreSQL.

---

# Main Frontend Routes

| Route                | Description                       |
| -------------------- | --------------------------------- |
| `/`                  | Home page                         |
| `/products`          | Browse food products              |
| `/products/:barcode` | View detailed product information |
| `/favorites`         | View saved favorite products      |
| `/food-logs`         | Manage personal food logs         |
| `/about`             | Learn more about Eco Afya         |
| `/login`             | User login                        |
| `/signup`            | User registration                 |

Protected routes require authentication.

---

# Error Handling

Eco Afya includes error handling throughout the application.

Examples include:

* Failed API requests
* Invalid login credentials
* Missing required form fields
* Unauthorized requests
* Loading states
* Empty data states
* Failed product requests
* Database/API errors

For example, when products cannot be loaded, the frontend displays an error message instead of leaving the page blank.

---

# Responsive Design

The application is designed to work across different screen sizes.

Responsive layouts are provided for:

* Desktop
* Tablet
* Mobile

The interface uses responsive CSS layouts to ensure that product cards, navigation, forms, and other components remain usable on different devices.

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/gatheruisaac/Eco_Afya.git
```

## 2. Navigate into the project

```bash
cd Eco_Afya
```

## 3. Install frontend dependencies

```bash
npm install
```

## 4. Set up the backend

Navigate to the server directory:

```bash
cd server
```

Create and activate the Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

## 5. Configure environment variables

Create a `.env` file inside the `server/` directory.

Example:

```env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
```

Do not commit environment variables or passwords to GitHub.

## 6. Run database migrations

From the `server/` directory:

```bash
flask db upgrade
```

## 7. Start the Flask backend

```bash
flask run
```

The backend will run on the Flask development server.

## 8. Start the React frontend

Open another terminal and navigate to the project:

```bash
cd ~/Development5/Eco_Afya
```

Then run:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# Building for Production

To create a production frontend build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

# Git Workflow

Git was used throughout development to track project milestones and changes.

Examples of meaningful commits include:

```text
feat: add application routing and pages
feat: fetch food products from Open Food Facts
feat: add Eco Afya about page
feat: add favorites with local storage
feat: add product details view
feat: add authentication pages
feat: add Flask backend
feat: add user authentication
feat: add food log CRUD
fix: preserve serverless API routes on Vercel
fix: resolve product API loading issue
```

The project uses `.gitignore` to prevent unnecessary files and sensitive configuration from being committed.

Examples include:

* `node_modules/`
* Python virtual environments
* `.env`
* build output
* Python cache files

---

# Deployment

Eco Afya is deployed using Vercel for the frontend and Render for the Flask backend.

### Live Application

[Eco Afya Live Application](https://eco-afya.vercel.app/)

### GitHub Repository

[Eco Afya GitHub Repository](https://github.com/gatheruisaac/Eco_Afya)

---

# Purpose

The goal of Eco Afya is to make food information easier to understand by presenting nutritional and environmental information together.

Instead of considering only calories or nutritional values, users can also consider the environmental impact of their food choices.

Users can create accounts and maintain personal food-consumption records.

---

# Future Improvements

Possible future improvements include:

* Advanced food search and filtering
* Product comparison
* Personalized nutrition recommendations
* Food consumption statistics and charts
* Persistent database storage for favorites
* More detailed user dashboards
* Improved product categorization
* AI-powered food recommendations

---

# Author

**Isaac Gatheru Kanyua**

Built as a **Moringa School Full-Stack Application**.

---

# Current Project Notes

This section records the current implementation details added after the original project documentation was written.

## Current Frontend Stack

The frontend uses Tailwind CSS with the Vite integration for the current responsive interface.

Tailwind is configured through:

* `tailwindcss`
* `@tailwindcss/vite`
* `vite.config.js`
* `src/index.css`

Install all frontend dependencies with:

```bash
npm install
```

Run the frontend locally with:

```bash
npm run dev
```

Build the frontend for production with:

```bash
npm run build
```

## Environment Variables

The frontend reads the Flask backend URL from `VITE_API_URL`.

For local development, create a `.env` or `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```

For deployment, configure the variable with the deployed Flask API URL:

```env
VITE_API_URL=https://eco-afya-api.onrender.com
```

The Flask backend requires the following variables in `server/.env`:

```env
DATABASE_URL=your_postgresql_database_url
SECRET_KEY=your_secret_key
FRONTEND_URL=https://eco-afya.vercel.app
SESSION_COOKIE_SAMESITE=None
SESSION_COOKIE_SECURE=True
```

Never commit real secrets, database credentials, access tokens, or private environment files.

## Current Product Routes

The product detail route currently uses a product code:

```text
/products/:code
```

For example:

```text
/products/3760049790214
```

The products page requests its catalogue through:

```text
GET /api/products
```

The Vercel serverless function proxies product data from Open Food Facts and returns a JSON object containing a `products` array.

## Current User Experience

The current interface includes:

* A responsive dark green and lime visual system.
* Product discovery with Nutri-Score and Eco-Score indicators.
* Product detail views with product images, ingredients, and barcode information.
* Browser-based favorite product storage.
* Session-protected personal food logs.
* Product suggestions while creating a food log.
* Loading, empty, and error states across data-driven pages.
* African food and agriculture imagery from Ghana, Cameroon, and Zanzibar on the public-facing pages.

## Presentation Materials

A PowerPoint presentation is included for project demonstrations and capstone presentations:

```text
presentation/eco-afya-presentation.pptx
```

The deck covers:

* The food-choice problem.
* The Eco Afya solution.
* The user journey.
* Product intelligence and scoring.
* Favorites and food logs.
* Full-stack architecture.
* A live product demonstration invitation.

The deck source generator is available at:

```text
presentation/eco-afya-presentation.js
```

## Deployment Links

* Frontend: [https://eco-afya.vercel.app](https://eco-afya.vercel.app)
* GitHub repository: [https://github.com/gatheruisaac/Eco_Afya](https://github.com/gatheruisaac/Eco_Afya)
* Backend health check: [https://eco-afya-api.onrender.com/health](https://eco-afya-api.onrender.com/health)
* Product API: [https://eco-afya.vercel.app/api/products](https://eco-afya.vercel.app/api/products)

## Verification Commands

From the project root:

```bash
npm run build
npm run lint
```

From the backend environment:

```bash
python3 -m py_compile server/app/__init__.py server/config.py server/app/routes.py
```

The production build and Python syntax checks should pass before deployment. The lint command also scans generated or presentation files, so any reported lint warnings should be reviewed before final submission.

## Known Limitations and Future Work

* Open Food Facts availability can affect product catalogue loading.
* Favorites currently use browser Local Storage rather than PostgreSQL persistence.
* Food-log pagination is supported by the backend, while the current interface loads the first page of records.
* Automated frontend and backend tests should be added as a future improvement.
* The mobile navigation can be expanded into a dedicated menu for smaller screens.
