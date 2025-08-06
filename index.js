const express = require('express');
const products = require('./products'); // Importing the static data to represent a large dataset. 

const app = express();
const PORT = process.env.PORT || 3000;


// Adding a simple "hello world" route to confirm the server is running.
app.get('/', (req, res) => {
    res.send('Hello from the Pagination Demo API!');
});

// Simple rout to return all products
app.get('/products', (req, res) => {
    res.json(products);
});


// Offset-based pagination endpoint
app.get('/api/products/offset', (req, res) => {
  const page = parseInt(req.query.page) || 1; // In Express, req.query is how we access the query parameters from the URL (e.g., ?page=1&limit=10).
  const limit = parseInt(req.query.limit) || 10; //use parseInt() to convert the query parameters (which are always strings) into numbers so we can do math with them.
  const offset = (page - 1) * limit;

  const paginatedProducts = products.slice(offset, offset + limit); // Using JS slice method to return a new array containing the elements from the offset to the offset + limit index. It's the core of my pagination logic.
  console.log("Paginated Products:", paginatedProducts);



  res.json({
    data: paginatedProducts,
    meta: {
      totalProducts: products.length,
      page: page,
      limit: limit,
      totalPages: Math.ceil(products.length / limit)
    }
  });
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});