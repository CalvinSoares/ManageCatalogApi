import type { ProductDTO } from "../../dto/productDto";

export const transformToProductDTO = (
  product: ProductDTO | null
): ProductDTO => {
  if (!product || typeof product !== "object") {
    throw new Error("Invalid user data");
  }

  return {
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    createdAt: product.createdAt,
  };
};
