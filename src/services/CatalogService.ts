import type {
  CatalogDTO,
  CreateCatalogDTO,
  UpdateCatalogDTO,
} from "../dto/catalogDTO";
import { Catalog } from "../models/CatalogModel";
import { transformToCatalogDTO } from "../utils/converterDTO/transformToCatalogDTO copy";

class CatalogService {
  async getUserCatalogs(userId: string | undefined) {
    if (!userId) {
      throw new Error("User ID is required");
    }
    return await Catalog.find({ userId })
      .populate("products")
      .populate("user", "-password");
  }

  async findById(id: string) {
    const catalog = (await Catalog.findById(id, {}, { lean: true }).populate(
      "products"
    )) as CatalogDTO | null;

    if (!catalog) {
      return null;
    }

    const catalogDTO = transformToCatalogDTO(catalog);
    return catalogDTO;
  }

  async add(catalog: CreateCatalogDTO) {
    const catalogCreated = (await Catalog.create(
      catalog
    )) as unknown as CatalogDTO | null;

    if (!catalogCreated) {
      return null;
    }

    const catalogDTO = transformToCatalogDTO(catalogCreated);
    return catalogDTO;
  }

  async updateById(id: string, catalog: UpdateCatalogDTO) {
    const catalogUpdated = (await Catalog.findByIdAndUpdate(
      id,
      { $set: catalog },
      { new: true, lean: true }
    )) as CatalogDTO | null;

    if (!catalog) {
      return null;
    }

    const catalogDTO = transformToCatalogDTO(catalogUpdated);
    return catalogDTO;
  }

  async deleteById(id: string) {
    const catalogDeleted = (await Catalog.findByIdAndDelete(
      id
    )) as CatalogDTO | null;

    if (!catalogDeleted) {
      return null;
    }
    const catalogDTO = transformToCatalogDTO(catalogDeleted);
    return catalogDTO;
  }
}

export default new CatalogService();
