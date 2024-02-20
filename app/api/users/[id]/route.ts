import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
  const {
    params: { id },
  } = context;
  console.log("GET user id:", id);

  await startDb();
  const user = await UserModel.findById({
    _id: id,
  });

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "This user does not exist.",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Found.",
    user,
  });
};
