const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

const orders = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/ping", (req, res) => {
  res.send("PONG");
});

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

app.post("/api/order", async (req, res) => {
  allProducts = req.body.products;

  for (const product of allProducts) {
    const reservationProduct = `https://api-stock.vercel.app/api/stock/${product.productId}/movement`;
    try {
      await axios.post(reservationProduct, {
        productId: product.productId,
        quantity: product.quantity,
        status: "Reserve",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const orderId = createRandomId();

  res.status(201).json({
    id: orderId,
  });

  orders[orderId] = allProducts;

  const nbProducts = allProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const NotificationShippingUrl = `http://microservices.tp.rjqu8633.odns.fr/api/shipping/`;
  try {
    await axios.post(NotificationShippingUrl, {
      orderId,
      nbProducts,
    });
  } catch (error) {
    console.log(error);
  }
});

function createRandomId() {
  return Math.floor(Math.random() * 1000);
}

// Get de la commande

// app.get("/api/order/:id", async (req, res) => {
//   const orderId = req.params.id;

//   const url = `http://microservices.tp.rjqu8633.odns.fr/api/order/${orderId}`;

//   try {
//     const response = await axios.get(url);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// Changement du statut de la commande

// app.put("/api/order/:id", async (req, res) => {
//   const orderId = req.params.id;
//   const status = req.body.status;

//   const url = `http://microservices.tp.rjqu8633.odns.fr/api/order/${orderId}`;

//   try {
//     await axios.put(url, {
//       status: status,
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   res.status(200).json({
//     message: "La commande a été modifiée avec succès",
//   });
// });

// app.post("/api/shipping", async (req, res) => {
//   const orderId = req.body.orderId;
//   const productArray = req.body.productArray;

//   const totalQuantity = productArray.reduce(
//     (acc, product) => acc + product.quantite,
//     0
//   );

//   const url = `http://microservices.tp.rjqu8633.odns.fr/api/shipping/`;
//   try {
//     await axios.post(url, {
//       orderId: orderId,
//       nbProducts: totalQuantity,
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   res.status(200).json({
//     orderId: orderId,
//     nbProducts: totalQuantity,
//   });
// });

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

module.exports = app;
