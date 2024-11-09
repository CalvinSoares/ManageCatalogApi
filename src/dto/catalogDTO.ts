export interface CatalogDTO {
  _id: string;
  name: string;
  userId: string | undefined; // Permite que seja 'undefined'
  products: string[];
}

export interface CreateCatalogDTO {
  name: string;
  userId: string | undefined; // Permite que seja 'undefined'
  products: string[];
}

export interface UpdateCatalogDTO {
  name?: string;
  productIds?: string[];
}
