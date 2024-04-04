const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
// Dummy data
const resources = [
  { id: 1, name: 'Resource 1' },
  { id: 2, name: 'Resource 2' },
  { id: 3, name: 'Resource 3' }
];

// Route to retrieve a specific resource by ID
app.get('/resources/:id', (req, res) => {
  const resourceId = parseInt(req.params.id);
  
  // Find the resource with the given ID
  const resource = resources.find(resource => resource.id === resourceId);

  // If resource is found, send it in the response
  if (resource) {
    res.json(resource);
  } else {
    // If resource is not found, send a 404 Not Found response
    res.status(404).json({ error: 'Resource not found' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
