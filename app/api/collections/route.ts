import startDb from "@/app/lib/db";
import { CollectionDocument } from "@/app/lib/types";
import CollectionModel from "@/app/models/collectionModel";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await startDb();
    const collections = await CollectionModel.find({});

    if (!collections) {
      return NextResponse.json({
        ok: false,
        message: "Something went wrong.",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Successfully loaded.",
      collections,
    });
  } catch (error) {
    throw error;
  }
};

export const POST = async (req: Request) => {
  try {
    await startDb();
    const { name, description } = (await req.json()) as CollectionDocument;

    if (!name)
      return NextResponse.json(
        {
          ok: false,
          message: "Required field is missing.",
        },
        { status: 401 }
      );

    const collection = await CollectionModel.create({
      name,
      description,
    });
    return NextResponse.json({
      ok: true,
      message: "Successfully created.",
      collection,
    });
  } catch (error) {
    throw error;
  }
};
