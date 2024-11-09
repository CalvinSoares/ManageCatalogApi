import type { Request, Response } from "express";
import ProductService from "../services/ProductService";
import type { ProductDTO } from "../dto/productDto";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();

      if (!products) {
        res.status(404).json({ message: "Products not found" });
        return;
      }

      res.status(200).json(products);
      return;
    } catch (err) {
      res.status(500).json({ message: "Error get all products", error: err });
    }
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await ProductService.findById(id);

      if (!product) {
        res.status(404).json({ message: "product not found" });
        return;
      }

      res.status(200).json(product);
      return;
    } catch (err) {
      res.status(500).json({ message: "Error search product", error: err });
      return;
    }
  }

  async createProduct(req: Request, res: Response) {
    const product: ProductDTO = req.body;
    try {
      const productCreated = await ProductService.add(product);
      res.status(201).json(productCreated);
    } catch (err) {
      res.status(500).json({ message: "Error creating product", error: err });
    }
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product: ProductDTO = req.body;
    try {
      const productUpdated = await ProductService.updateById(id, product);
      if (!product) {
        res.status(404).json({ message: "product not found" });
        return;
      }
      res.status(200).json(productUpdated);
      return;
    } catch (err) {
      res.status(500).json({ message: "Error updatingo product", error: err });
      return;
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const productDeleted = await ProductService.deleteById(id);
      if (!productDeleted) {
        res.status(404).json({ message: "product not found" });
        return;
      }
      res.status(200).json(productDeleted);
      return;
    } catch (err) {
      res.status(500).json({ message: "Error deleting product", error: err });
      return;
    }
  }
}

export default new ProductController();
