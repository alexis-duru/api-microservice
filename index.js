import express from "express";
import { router as orderRouter } from "./routes/order.route.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/order", (req, res) => {
  res.send("PONG");
});

// Utilisez la route correcte ici
app.use("/api", orderRouter);

app.listen(3000, () => {
  console.log("Running on port 3000.");
});
