# 🥑 Eco Afya

Eco Afya is a React web application that helps users explore food products and make healthier, more sustainable choices by surfacing nutritional and environmental information sourced from the Open Food Facts API.

## ✨ Features

- 🏠 Home page introduction
- 🛍️ Product browsing
- 🔎 Product detail views
- ❤️ Favorites with persistent storage
- 🌱 Eco-Score ratings
- 🥗 Nutritional information
- ℹ️ About page

### 🏠 Home Page
The home page introduces Eco Afya and provides users with an easy way to begin exploring food products.

### 🛍️ Products
Users can browse food products retrieved from the Open Food Facts API.
Each product can display:
- Product name
- Product image
- Brand
- Nutri-Score
- Eco-Score

### 🔎 Product Details
Users can select a product to view additional information about that specific product.

### ❤️ Favorites
Users can save products to their favorites.
Favorites are stored using the browser's `localStorage`, allowing them to remain available when the user navigates between pages.

### ℹ️ About Page
The About page explains the purpose of Eco Afya and the project's goal of encouraging healthier and more sustainable food choices.

## 🌐 API
Eco Afya uses the Open Food Facts API.

API documentation:
https://world.openfoodfacts.org/

The application retrieves product information including nutritional and environmental data.

## 🛠️ Technologies Used
- React
- JavaScript
- React Router
- Vite
- CSS
- Open Food Facts API
- Vercel
- Git & GitHub
- Browser localStorage

## 📂 Project Structure
```text
Eco_Afya/
├── api/
│   └── products.js
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Favorites.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── public/
├── package.json
├── vercel.json
└── README.md
```

## ⚙️ Getting Started

1. Clone the repository

```bash
git clone https://github.com/gatheruisaac/Eco_Afya.git
```

2. Navigate into the project

```bash
cd Eco_Afya
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```
http://localhost:5173
```

5. Build the project

To create a production build:

```bash
npm run build
```

## 🌍 Deployment
Eco Afya is deployed using Vercel.

Live application:
https://eco-afya.vercel.app/

The project is connected to GitHub, allowing updates to be deployed from the main branch.

## 🧪 Testing
Before deployment, the main user flows should be tested:

- [ ] Navigate between all pages
- [ ] Browse products
- [ ] Open product details
- [ ] Add and remove favorites
- [ ] Refresh the application
- [ ] Test responsive layouts
- [ ] Test API loading and error states

## 🎯 Project Goals
The main goals of Eco Afya are to:

1. Demonstrate practical React development skills.
2. Consume and display data from an external API.
3. Implement reusable React components.
4. Implement client-side routing.
5. Manage application state with React hooks.
6. Persist favorites using localStorage.
7. Handle loading and error states.
8. Deploy a React application to the web.
9. Encourage healthier and more sustainable food choices.

## 👨‍💻 Author
**Isaac Gatheru Kanyua**
Moringa School Student
Software Engineer | Frontend Developer

## 📄 License
This project was created for educational purposes as part of a Moringa School React project.