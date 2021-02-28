const express = require("express");

//Add parenthesis because express is just a function and we want it to run
const app = express();

app.use(express.json());

let data = [
  {
    prod: "iphone",
  },
  {
    prod: "samsung",
  },
  {
    prod: "nokia",
  },
  {
    prod: "tecno",
  },
];

/* Get request */
const getHi = (req, res) => {
  res.send(`Products: ${data}`);
  console.log(`GET request made`);
};

app.get("/", getHi);

/* Post request */

const postHi = (req, res) => {
  const newProduct = req.body;
  data.push(newProduct);
  res.send(`New Product: ${JSON.stringify(newProduct)} added!`);
  console.log(`POST request made`);
};

app.post("/add", postHi);

/* Delete request */
// const deleteHi = (req, res) => {
//   // find item from array of data
//   let found = data.find( product => { return product === JSON.stringify(req.body)})
// //   let found = data.find(item => {
// //     return item.id === parseInt(req.params.id);
// // });

// if (found) {
//     // if item found then find index at which the item is
//     // stored in the `data` array
//     let targetIndex = data.indexOf(found);

//     // splice means delete item from `data` array using index
//     data.splice(targetIndex, 1);

//   // const deleteProd = req.body;
//   // data.filter( product => { return product === deleteProd? product: ''})
//   res.send(`Deleted: ${JSON.stringify(data)} and target index ${targetIndex}` );
//   console.log("Delete request made!");
// }};

const deleteHi = (req, res) => {
  const index = data.findIndex((product) => product === { c: "nokia" });
  if (index > -1) {
    data.splice(index, 1);
  }
  res.send(data);
  console.log(index);
};

app.delete("/delete", deleteHi);

/* Update request */
const putHi = (req, res) => {
  res.send("Put request");
  console.log("Put request made!");
};

app.put("/update", putHi);

//setting server to listen for requests on port 5000
app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
