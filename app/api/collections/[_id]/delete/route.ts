import startDb from "@/app/lib/db";
import CollectionModel from "@/app/models/collectionModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  const { _id } = await req.json();
  await startDb();

  try {
    const res = await CollectionModel.findByIdAndDelete({
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
