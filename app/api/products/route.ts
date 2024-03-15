import startDb from "@/app/lib/db";
import CategoryModel from "@/app/models/categoryModel";
import CollectionModel from "@/app/models/collectionModel";
import ProductModel from "@/app/models/productModel";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await startDb();
    const products = await ProductModel.find({})
      .populate({ path: "categoryId", model: CategoryModel })
      .populate({ path: "collectionId", model: CollectionModel });
    // .populate("collectionId");

    return NextResponse.json({
      ok: true,
      message: "Successfully loaded",
      products,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: "Something went wrong.",
    });
  }
};

export const POST = async (req: Request) => {
  try {
    await startDb();
    const data = await req.json();
    const sale =
      data?.base && data?.base != 0
        ? (data?.base - data?.discounted) / data?.base
        : 0;
    const product = await ProductModel.create({
      ...data,
      sale,
    });

    product.toObject({ virtuals: true });
    console.log(product.sale);

    console.log("created product: ", product);
    return NextResponse.json({
      ok: true,
      message: "Successfully created!",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};
