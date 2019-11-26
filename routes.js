const express = require("express");
const cartRoutes = express.Router();

cartRoutes.get("/", (req, res) => {
  res.send("It Lives!");
});

const cartItems = [
  { id: 1, product: "Air Pods Pro", price: "250", quantity: "1" },
  { id: 2, product: "iPad Pro", price: "1000", quantity: "2" },
  { id: 3, product: "Macbook Pro", price: "2500", quantity: "3" }
];
let nextId = 4;

cartRoutes.get("/cart-items", (req, res) => {
  res.json(cartItems);
});

cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  let foundCart = cartItems.find(cartItem => cartItem.id === id);
  if (foundCart) {
    res.json(foundCart);
  } else {
    res.status(404);
    res.send("ID Not Found");
  }
});

cartRoutes.post("/cart-items", (req, res) => {
  const cartItem = req.body;
  cartItem.id = nextId;
  nextId++;
  cartItems.push(cartItem);

  res.status(201);
  res.json(cartItem);
});

cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cartItem = req.body;
  cartItem.id = id;

  const index = cartItems.findIndex(i => i.id === id);

  cartItems.splice(index, 1, cartItem);
  res.json(cartItem);
});

cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex(i => i.id === id);
  // If found...
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  // Set response code to 204. Send no content.
  res.sendStatus(204);
});

module.exports = cartRoutes;
