import startDb from "@/app/lib/db";
import CategoryModel from "@/app/models/categoryModel";
import Error from "next/error";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, context: any) => {
  const { _id } = await req.json();
  await startDb();

  try {
    const res = await CategoryModel.findByIdAndDelete({
      _id,
    });

    if (!res)
      return NextResponse.json({
        ok: false,
        message: "Something went wrong. Please retry.",
      });

    return NextResponse.json({
      ok: true,
      message: "Successfully deleted!.",
    });
  } catch (error) {
    throw error;
  }
};
