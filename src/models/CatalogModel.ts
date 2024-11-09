import { Schema, model, type Document, type Types } from "mongoose";
import type { IProduct } from "./ProductModel";

export interface ICatalog extends Document {
  name: string;
  products: IProduct[];
  user: Types.ObjectId;
}

const catalogSchema = new Schema<ICatalog>({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Catalog = model<ICatalog>("Catalog", catalogSchema);
