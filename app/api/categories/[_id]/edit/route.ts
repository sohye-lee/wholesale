import startDb from "@/app/lib/db";
import CategoryModel from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, context: any) => {
  const { name } = await req.json();
  const {
    params: { _id },
  } = context;

  await startDb();

  try {
    const category = await CategoryModel.findByIdAndUpdate(_id, {
      name,
    });

    if (!category)
      return NextResponse.json({
        ok: false,
        message: "Something went wrong. Please retry.",
      });

    return NextResponse.json({
      ok: true,
      message: "Successfully deleted!.",
      category,
    });
  } catch (error) {
    throw error;
  }
};
