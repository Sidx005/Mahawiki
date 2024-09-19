const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
// const env=require('')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

let politicians;
try {
  const rawData = fs.readFileSync(path.join(__dirname, 'api', 'data.json'), 'utf-8');
  politicians = JSON.parse(rawData);
  console.log(politicians);
  
} catch (error) {
  console.error('Error reading or parsing data.json:', error);
  politicians = []; 
}

// API endpoint
app.get('/api/politicians', (req, res) => {
  res.json(politicians);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
