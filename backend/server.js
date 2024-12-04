const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Dummy data for recommendations
const recommendations = [
  {
    id: 1,
    name: "Cotton T-Shirt",
    price: "799",
    image: "https://www.myntra.com/formal-shoes/killer/killer-men-round-toe-lace-ups-formal-derby-shoes/31602544/buy",
    link: "#"
  },
  {
    id: 2,
    name: "Sneakers",
    price: "1999",
    image: "https://images.meesho.com/images/products/386459243/civmp_512.webp",
    link: "#"
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: "2999",
    image: "https://via.placeholder.com/150",
    link: "#"
  }
];

// API endpoint to fetch recommendations
app.get("/api/recommendations", (req, res) => {
  res.json(recommendations);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
