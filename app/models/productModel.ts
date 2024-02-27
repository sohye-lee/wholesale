import { Document, Model, Schema, model, models } from "mongoose";
import { ProductDocument } from "../lib/types";
// import { ProductDocument } from "@lib/types";

// export interface ProductDocument extends Document {
//   title: string;
//   description?: string;
//   bulletpoints?: string[];
//   thumbnail?: { url: string; id: string };
//   images?: { url: string; id: string }[];
//   price: {
//     base: number;
//     discounted: number;
//   };
//   sale: number;
//   quantity: number;
//   // rating?: number;
//   categoryId: {
//     type: Schema.Types.ObjectId;
//     ref: 'Category';
//   };
//   collectionId: {
//     type: Schema.Types.ObjectId;
//     ref: 'Collection';
//   };
// }

const productSchema = new Schema<ProductDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    bulletpoints: {
      type: [String],
    },
    thumbnail: {
      id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    images: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    price: {
      base: { type: Number, required: true },
      discounted: { type: Number, required: true },
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    // rating: {
    //   type: Number,
    //   default: 0,
    // },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.virtual("sale").get(function (this: ProductDocument) {
  return (this.price.base - this.price.discounted) / this.price.base;
});

const ProductModel =
  models.Product || model<ProductDocument>("Product", productSchema);

export default ProductModel as Model<ProductDocument>;
