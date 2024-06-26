"use server";

import startDb from "@/app/lib/db";
import { env } from "@/app/lib/env";
import { CreateProductData } from "@/app/lib/types";
import ProductModel from "@/app/models/productModel";
import { v2 as cloudinary } from "cloudinary";
import { Db } from "mongodb";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
  secure: true,
});

// Cloudinary Credentials
export const getCloudConfig = () => {
  return {
    name: process.env.CLOUD_NAME!,
    key: process.env.CLOUD_API_KEY!,
  };
};

// Cloudinary Signature
export const getCloudSignature = async () => {
  const secret = cloudinary.config().api_secret!;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    secret
  );
  return { timestamp, signature };
};

// export const createProduct = async (info: CreateProductData) => {
//   try {
//     await startDb();
//     const product = await ProductModel.create({
//       ...info,
//     });
//     return NextResponse.json({
//       ok: true,
//       message: "The product has been successfully created!",
//       product,
//     });
//   } catch (error) {
//     console.log((error as any).message);
//   }
// };

export const removeImageFromCloud = async (
  publicId: string,
  productId: string
) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    console.log(response);
    const existingProduct = await ProductModel.findById(productId);
    if (!existingProduct) return { ok: false, message: "Product not found." };
    const updateProductResponse = await ProductModel.findOneAndUpdate(
      { _id: productId },
      {
        images: existingProduct.images?.filter((image) => image.id != publicId),
      }
    );
    console.log("image removed res: ", updateProductResponse);
    return { ok: true, message: "Image has been deleted." };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Something went wrong." };
  }
};
