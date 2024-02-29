const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/order", (req, res) => {
  res.send("PONG");
});

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

app.post("/api/order", async (req, res) => {
  const status = "pending";

  productArray = req.body.products;

  if (!availableProduct(productArray)) {
    return res.status(400).json({
      message: "Le produit n'est pas disponible à la commande",
    });
  }

  for (const product of productArray) {
    const url = `https://api-stock.vercel.app/api/stock/${product.id}/movement`;
    try {
      await axios.post("/user", {
        productId: product.id,
        quantity: product.quantity,
        status: "Reserve",
      });
    } catch (error) {
      console.log(error);
    }
  }

  res.status(201).json({
    id: createRandomId(),
  });

  function availableProduct(productArray) {
    return productArray.some((product) => product.quantite > 0);
  }
});

function createRandomId() {
  return Math.floor(Math.random() * 1000);
}

// app.put("/api/order/:id", (req, res) => {
//   const orderId = req.params.id;
//   const status = req.body.status;

//   if (status === "pending") {
//     return res.status(400).json({
//       message: "La commande est en attente de validation",
//     });
//   }

//   if (status === "delivered") {
//     return res.status(400).json({
//       message: "La commande a été livrée",
//     });
//   }

//   res.status(200).json({
//     message: "La commande a été modifiée avec succès",
//   });
// });

// app.post("/api/shipping", (req, res) => {
//   const orderId = req.body.orderId;
//   const productArray = req.body.productArray;

//   if (orderId === 0) {
//     return res.status(404).json({
//       message: "La commande n'existe pas",
//     });
//   }

//   const totalQuantity = productArray.reduce(
//     (acc, product) => acc + product.quantite,
//     0
//   );

//   res.status(200).json({
//     orderId: orderId,
//     totalQuantity: totalQuantity,
//   });
// });

// app.get("/api/order/:id", (req, res) => {
//   const orderId = req.params.id;

//   if (orderId === "0") {
//     return res.status(404).json({
//       message: "La commande n'existe pas",
//     });
//   }

//   res.status(200).json({
//     orderId: orderId,
//     status: "pending",
//     productArray: [
//       {
//         productId: 1,
//         quantite: 1,
//       },
//       {
//         productId: 2,
//         quantite: 0,
//       },
//     ],
//   });
// });

module.exports = app;
