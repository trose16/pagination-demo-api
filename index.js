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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});