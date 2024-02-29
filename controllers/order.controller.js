export const createOneOrder = (req, res, next) => {
  const testProduct = {
    nom: "Un produit random",
    prix: 10.99,
    quantite: 1,
  };

  req.body.testProduct = testProduct;

  res.status(201).json({
    message: `create one order`,
    data: req.body,
  });
};
