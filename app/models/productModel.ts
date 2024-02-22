import { Schema } from "mongoose";
import { ProductDocument } from "@lib/types";

const productSchema = new Schema<ProductDocument>({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  price: {
    mrp: {
      type: Number,
    },
    salePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    saleOff: {
      type: Number,
    },
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  collection: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});
