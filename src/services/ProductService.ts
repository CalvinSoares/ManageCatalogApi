import type { CreateProductDTO, ProductDTO } from "../dto/productDto";
import { Product } from "../models/ProductModel";
import { transformToProductDTO } from "../utils/converterDTO/transformToProductDTO";

class ProductService {
  async getAll() {
    const product = await Product.find().lean();
    if (!product) {
      return null;
    }

    return product.map((p) => ({
      _id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      createdAt: p.createdAt,
    }));
  }

  async findById(id: string) {
    const product = (await Product.findById(
      id,
      {},
      { lean: true }
    )) as ProductDTO | null;

    if (!product) {
      return null;
    }
    const productDTO = transformToProductDTO(product);
    return productDTO;
  }

  async add(product: CreateProductDTO) {
    const productCreated = (await Product.create(
      product
    )) as unknown as ProductDTO | null;

    if (!productCreated) {
      return null;
    }
    const orderDTO = transformToProductDTO(productCreated);
    return orderDTO;
  }

  async updateById(id: string, product: CreateProductDTO) {
    const productUpdated = (await Product.findByIdAndUpdate(
      id,
      { $set: product },
      {
        new: true,
        lean: true,
      }
    )) as ProductDTO | null;

    if (!product) {
      return null;
    }
    const productDTO = transformToProductDTO(productUpdated);
    return productDTO;
  }

  async deleteById(id: string) {
    const productDeleted = (await Product.findByIdAndDelete(
      id
    )) as ProductDTO | null;

    if (!productDeleted) {
      return null;
    }
    const productDTO = transformToProductDTO(productDeleted);
    return productDTO;
  }
}

export default new ProductService();
