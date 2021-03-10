//Import express
const express = require("express");

//Add parenthesis because express is just a function and we want it to run
const app = express();

app.use(express.json());

let data = [
  {
    id: 1,
    name: "iphone",
    description: "random data description right here",
  },
  {
    id: 2,
    name: "samsung",
    description: "random data description right here",
  },
  {
    id: 3,
    name: "nokia",
    description: "random data description right here",
  },
  {
    id: 4,
    name: "tecno",
    description: "random data description right here",
  },
];

/* Get request */
const getProduct = (req, res) => {
  console.log(`GET request made`);
  try {
    res.json({
      message: "OK",
      data,
    });
  } catch {
    res.json({
      message: "Oops! Something went wrong 😧",
    });
  }
};

/* Post request */
const postProduct = (req, res) => {
  console.log(`POST request made`);

  const { name, description } = req.body;

  const newProduct = {
    id: data.length + 1,
    name,
    description,
  };

  try {
    data.push(newProduct);
    res.json({
      message: `New Product: ${newProduct.name} added!`,
      data: newProduct,
    });
  } catch {
    res.json({
      message: "Oops! Something went wrong 🥴",
    });
  }
};

/* Delete request */
const deleteProduct = (req, res) => {
	console.log("DELETE request successful!");
  /**
   * loop through products
   * compare id on route with product.id
   * splice the object
   */
  try {
    const index = data.findIndex((product) => product.name === req.body.name);
    if (index > -1) {
      data.splice(index, 1);
    }
    res.json({
      message: `Product: ${req.body.name} has been deleted successfully!`,
      data
    })
  } catch {
    res.json({
      message: "Oops! Something went wrong 😤",
    });
  }
};

/* Update request */
const putProduct = (req, res) => {
  console.log("Update successfully made!");
  const { id, name, description } = req.body;
  /**
   * find product by id
   * replace data existing in-memory with what was sent in req.body
   */
  try {
    data.map((product) => {
      if (product.id === id) {
        product.name = name;
        product.description = description;
      }
    });
    res.send(data);
  } catch {
    res.json({
      message: "Oops! Something went wrong 🤪",
    });
  }
};

/** app routes */
app.get("/", getProduct);
app.post("/add", postProduct);
app.delete("/delete", deleteProduct);
app.put("/update", putProduct);

//setting server to listen for requests on port 8080
app.listen(8080, () => {
  console.log(`Server is running smoothly on port 8080.`);
});
