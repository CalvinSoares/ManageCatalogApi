import type { CatalogDTO } from "../../dto/catalogDTO";

export const transformToCatalogDTO = (
  product: CatalogDTO | null
): CatalogDTO => {
  if (!product || typeof product !== "object") {
    throw new Error("Invalid user data");
  }

  return {
    _id: product._id,
    name: product.name,
    products: product.products,
    userId: product.userId,
  };
};
