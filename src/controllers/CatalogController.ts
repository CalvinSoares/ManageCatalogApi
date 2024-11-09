import type { Response, Request } from "express";
import CatalogService from "../services/CatalogService";
import type { CatalogDTO } from "../dto/catalogDTO";

class CatalogController {
  async getUserCatalogs(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    try {
      const catalogs = await CatalogService.getUserCatalogs(id);

      if (!catalogs) {
        res.status(404).json({ message: "no catalogs found" });
        return;
      }

      res.status(200).json(catalogs);
    } catch (err) {
      res.status(500).json({ message: "Intern Error" });
    }
  }

  async getCatalogById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const catalog = await CatalogService.findById(id);
      if (!catalog) {
        res.status(404).json({ message: "catalog not found" });
        return;
      }

      res.status(200).json(catalog);
      return;
    } catch (err) {
      res.status(500).json({ message: "Error search catalog", error: err });
      return;
    }
  }

  async createCatalog(req: Request, res: Response) {
    const catalog: CatalogDTO = req.body;
    try {
      const createdcatalog = await CatalogService.add(catalog);

      if (!createdcatalog) {
        res.status(400).json({ message: "no catalog found" });
        return;
      }
      res.status(201).json(createdcatalog);
    } catch (err) {
      res.status(500).json({ message: "Intern Error" });
    }
  }

  async updateCatalog(req: Request, res: Response) {
    const { id } = req.params;
    const catalog: CatalogDTO = req.body;

    try {
      const catalogUpdated = await CatalogService.updateById(id, catalog);

      if (!catalogUpdated) {
        res.status(404).json({ message: "catalog not found" });
        return;
      }
      res.status(200).json(catalogUpdated);
      return;
    } catch (err) {
      res.status(500).json({ message: "Error updating catalog", error: err });
      return;
    }
  }

  async deleteCatalog(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const catalogdeleted = await CatalogService.deleteById(id);

      if (!catalogdeleted) {
        res.status(404).json({ message: "catalog not found" });
        return;
      }
      res.status(200).json(catalogdeleted);
      return;
    } catch (err) {
      res.status(500).json({ message: "Error deleting catalog", error: err });
      return;
    }
  }
}

export default new CatalogController();
