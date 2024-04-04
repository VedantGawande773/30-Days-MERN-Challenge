const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/30DaysMERN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

app.get("/resources", async (req, res) => {
  try {
    const resource = await Resource.find();
    res.send(resource);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/resources", async (req, res) => {
  const newResource = new Resource({
    name: req.body.name,
  });
  try {
    const savedResource = await newResource.save();
    res.send({
      message: "Resource Added Successfully",
      resource: savedResource,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
