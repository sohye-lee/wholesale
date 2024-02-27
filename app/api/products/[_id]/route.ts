import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const {
    params: { _id },
  } = context;

  try {
    await startDb();
    const product = await ProductModel.findOne({
      _id,
    })
      .populate("categoryId")
      .populate("collectionId");

    return NextResponse.json({
      ok: true,
      product,
      message: "Successfully loaded.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: (error as any).message,
    });
  }
};
