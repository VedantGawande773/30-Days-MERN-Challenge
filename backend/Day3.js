const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); 

const resources = [
 { id: 1, name: 'Resource 1' },
 { id: 2, name: 'Resource 2' },
 { id: 3, name: 'Resource 3' }
];

app.get('/resources', (req, res) => {
 res.send(resources);
});

app.post('/resources', (req, res) => {
 const newResource = {
    id: resources.length + 1,
    name: req.body.resource_name 
 };
 resources.push(newResource);
 res.send({ message: "Resource Added Successfully", resource: newResource });
});

app.put('/resources/:id', (req, res) => {
   const resourceIndex = resources.findIndex(resource => resource.id === parseInt(req.params.id));
   if (resourceIndex !== -1) {
      resources[resourceIndex].name = req.body.resource_name;
      res.send({ message: "Resource Updated Successfully", resource: resources[resourceIndex] });
   } else {
      res.status(404).send({ message: "Resource Not Found" });
   }
  });

  app.delete('/resources/:id', (req, res) => {
   const resourceIndex = resources.findIndex(resource => resource.id === parseInt(req.params.id));
   if (resourceIndex !== -1) {
      const deletedResource = resources.splice(resourceIndex, 1);
      res.send({ message: "Resource Deleted Successfully", resource: deletedResource[0] });
   } else {
      res.status(404).send({ message: "Resource Not Found" });
   }
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
