// export const createOneOrder = (req, res, next) => {
// Fetch l'api /order
// const testProduct = {
//   nom: "Un produit random",
//   prix: 10.99,
//   quantite: 1,
// };

// if (!availableProduct(testProduct)) {
//   return res.status(400).json({
//     message: "Le produit n'est pas disponible à la commande",
//   });
// }

// req.body.testProduct = testProduct;

// Je requête l'api /stock afin de vérifier si le produit est disponible

// Si il est disponible, je réserve le produit et je crée un identifiant pour la commande

// Je crée la commande et la poste dans l'api /order

//   res.status(201).json({
//     message: `create one order`,
//     order: {
//       id: createRandomId(),
//     },
//   });
// };

// const availableProduct = (produit) => {
//   if (produit.quantite > 0) {
//     return true;
//   } else {
//     return false;
//   }
// };

// function createRandomId() {
//   return Math.floor(Math.random() * 1000);
// }

// Attention a ce que je récupére et ce que j'envoi
// Ne pas oublier de créer un ID au moment de l'envoi
