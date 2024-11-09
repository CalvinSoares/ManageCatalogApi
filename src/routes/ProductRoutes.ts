import { Router } from "express";
import { authenticateJWT } from "../middleware/AuthMiddleware";
import ProductControler from "../controllers/ProductControler";
import { authrorizeRole } from "../auth/AuthorizeRoles";

const productRouter = Router();

productRouter.get(
  "/products",
  authenticateJWT,
  authrorizeRole(["admin"]),
  ProductControler.getAllProducts
);

productRouter.get(
  "/product/:id",
  authenticateJWT,
  authrorizeRole(["admin"]),
  ProductControler.getProductById
);

productRouter.post(
  "/create/product",
  authenticateJWT,
  authrorizeRole(["admin"]),
  ProductControler.createProduct
);

productRouter.put(
  "/update/product/:id",
  authenticateJWT,
  authrorizeRole(["admin"]),
  ProductControler.updateProduct
);

productRouter.delete(
  "/delete/product/:id",
  authenticateJWT,
  authrorizeRole(["admin"]),
  ProductControler.deleteProduct
);

export default productRouter;
