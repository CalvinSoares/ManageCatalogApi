import { Schema, model, type Document, type Types } from "mongoose";

export interface ICatalog extends Document {
  name: string;
  products: Types.ObjectId[];
  user: Types.ObjectId;
}

const catalogSchema = new Schema<ICatalog>({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Catalog = model<ICatalog>("Catalog", catalogSchema);
