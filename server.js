//Import express
const express = require("express");

//Add parenthesis because express is just a function and we want it to run
const app = express();

app.use(express.json());

let data = [
  {
    id: 1,
    name: "iphone",
    description: 'random data description right here'
  },
  {
    id: 2,
    name: "samsung",
    description: 'random data description right here'
  },
  {
    id: 3,
    name: "nokia",
    description: 'random data description right here'
  },
  {
    id: 4,
    name: "tecno",
    description: 'random data description right here'
  },
];

/* Get request */
const getProduct = (req, res) => {
  console.log(`GET request made`);
  try {
    res.json({
      message: 'OK',
      data
    })
  } catch {
    res.json({
      message: 'Ooops! Something went wrong 😧'
    })
  }
};

/* Post request */
const postProduct = (req, res) => {
  console.log(`POST request made`);

  const { name, description } = req.body;
  
  const newProduct = {
    id: data.length +1,
    name,
    description
  }

  try { 
    data.push(newProduct);
    res.json({
      message: `New Product: ${newProduct.name} added!`,
      data: newProduct
    })
  }
  catch{
    res.json({
      message: 'Oooops! Something wrong happened here'
    })
  }
};

/* Delete request */
const deleteProduct = (req, res) => {
  /**
   * loop through products
   * compare id on route with product.id
   * splice the object
   */
  const index = data.findIndex((product) => product === { c: "nokia" });
  if (index > -1) {
    data.splice(index, 1);
  }
  res.send(data);
  console.log(index);
};

/* Update request */
const putProduct = (req, res) => {
  console.log("PUT request made!");
  const {id, name, description}= req.body
  /**
   * find product by id
   * replace data existing in-memory with what was sent in req.body
   */

  res.send("Put request");
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
