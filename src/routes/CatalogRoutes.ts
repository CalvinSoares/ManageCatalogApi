import { Router } from "express";
import CatalogController from "../controllers/CatalogController";
import { authenticateJWT } from "../middleware/AuthMiddleware";

const catalogRouter = Router();

catalogRouter.get(
  "/catalogs/:id",
  authenticateJWT,
  CatalogController.getUserCatalogs
);

catalogRouter.get(
  "/catalog/:id",
  authenticateJWT,
  CatalogController.getCatalogById
);

catalogRouter.post(
  "/create/catalog",
  authenticateJWT,
  CatalogController.createCatalog
);

catalogRouter.put(
  "/update/catalog/:id",
  authenticateJWT,
  CatalogController.updateCatalog
);

catalogRouter.post(
  "/delete/catalog/:id",
  authenticateJWT,
  CatalogController.deleteCatalog
);

export default catalogRouter;
