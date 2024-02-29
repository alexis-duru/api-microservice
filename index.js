const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/order", (req, res) => {
  res.send("PONG");
});
// app.use("/api", orderRouter);

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

app.post("/api/order", (req, res) => {
  const testProduct = {
    nom: "Un produit random",
    prix: 10.99,
    quantite: 1,
  };

  if (!availableProduct(testProduct)) {
    return res.status(400).json({
      message: "Le produit n'est pas disponible à la commande",
    });
  }

  req.body.testProduct = testProduct;

  res.status(201).json({
    message: `create one order`,
    order: {
      id: createRandomId(),
    },
  });

  function availableProduct(produit) {
    if (produit.quantite > 0) {
      return true;
    } else {
      return false;
    }
  }
});

function createRandomId() {
  return Math.floor(Math.random() * 1000);
}

module.exports = app;
