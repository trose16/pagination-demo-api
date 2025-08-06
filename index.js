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
  const offset = (page - 1) * limit; // Indicates where to start counting from in a list of items.

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


// Cursor-based pagination endpoint
app.get('/api/products/cursor', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const after = req.query.after; // 'after' is the cursor that indicates where to start the next page of results.
  

  let startIndex = 0;
  if (after) {
    const afterId = parseInt(after);
    const afterIndex = products.findIndex(product => product.id === afterId);
    if (afterIndex !== -1) {
      startIndex = afterIndex + 1; // Start from the next item after the cursor... Finds the index of the last product from the previous request, we start our new slice at the next index (+ 1).
    }
  }

  const paginatedProducts = products.slice(startIndex, startIndex + limit);

  const nextCursor = paginatedProducts.length > 0 ? paginatedProducts[paginatedProducts.length - 1].id : null;  // Our response contains the id of the last product in the current set. This is the value the client will use for their next request to get the following page of results.

  res.json({
    data: paginatedProducts,
    meta: {
      totalProducts: products.length,
      nextCursor: nextCursor
    }
  });
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});