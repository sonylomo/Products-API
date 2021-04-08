//Import express
const express = require("express");

//Add parenthesis because express is just a function and we want it to run
const app = express();

app.use(express.json());

let data = [
  {
    id: 1,
    name: "iPhone 12 Pro",
    description:
      "A14 Bionic. All-new design. Ceramic Shield. LiDAR Scanner. A Pro camera system optimized for low light.",
  },
  {
    id: 2,
    name: "Galaxy S21 Ultra 5G",
    description:
      "It reaches faster 5G speeds with our industry-leading chipset, all while creating a revolution in photography.",
  },
  {
    id: 3,
    name: "Nokia 8.3 5G",
    description: "Shoot pro videos, share with 5G.",
  },
  {
    id: 4,
    name: "Tecno Camon16 Premier",
    description:
      "The pioneer camera phone, won multiple world-class awards nad international media honor.",
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
  const { id } = req.params;

  /**
   * loop through products
   * compare id on route with product.id
   * splice the object
   */
  try {
    const product = data.filter((product) => {
      return product.id === Number(id);
    });

    const index = data.indexOf(product[0]);

    data.splice(index, 1);
    res.json({
      message: `Product: ${id} has been deleted successfully!`,
      data,
    });
  } catch {
    res.json({
      message: "Oops! Something went wrong 😤",
    });
  }
};

/* Update request */
const updateData = (req, res) => {
  console.log("Update successfully made!");
  const { name, description } = req.body;
  const { id } = req.params;
  /**
   * find product by id
   * replace data existing in-memory with what was sent in req.body
   */
  try {
    let update = data.filter((product) => {
      if (product.id === Number(id)) {
        product.name = name;
        product.description = description;
        return product;
      }
    });
    res.send(update);
  } catch {
    res.json({
      message: "Oops! Something went wrong 🤪",
    });
  }
};

/** app routes */
app.get("/", getProduct);
app.post("/product", postProduct);
app.delete("/product/:id", deleteProduct);
app.put("/product/:id", updateData);

//setting server to listen for requests on port 8080
app.listen(8080, () => {
  console.log(`Server is running smoothly on port 8080.`);
});
