import startDb from "@/app/lib/db";
import CollectionModel from "@/app/models/collectionModel";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, context: any) => {
  const { name, description } = await req.json();
  const {
    params: { _id },
  } = context;

  try {
    await startDb();
    const collection = await CollectionModel.findByIdAndUpdate(_id, {
      name,
      description,
    });

    if (!collection)
      return NextResponse.json({
        ok: false,
        message: "Something went wrong. Please retry.",
      });

    return NextResponse.json({
      ok: true,
      message: "Successfully deleted!.",
      collection,
    });
  } catch (error) {
    throw error;
  }
};
