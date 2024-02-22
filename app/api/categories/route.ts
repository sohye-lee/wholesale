import startDb from '@/app/lib/db';
import { CategoryDocument } from '@/app/lib/types';
import CategoryModel from '@/app/models/categoryModel';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    await startDb();
    const categories = await CategoryModel.find({});
    console.log('server categories', categories);

    if (!categories) {
      return NextResponse.json({
        ok: false,
        message: 'Something went wrong.',
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'Successfully loaded.',
      categories,
    });
  } catch (error) {
    throw error;
  }
};

export const POST = async (req: Request) => {
  try {
    await startDb();
    const { name } = (await req.json()) as CategoryDocument;

    if (!name)
      return NextResponse.json(
        {
          ok: false,
          message: 'Required field is missing.',
        },
        { status: 401 }
      );

    const category = await CategoryModel.create({
      name,
    });
    return NextResponse.json({
      ok: true,
      message: 'Successfully created.',
      category,
    });
  } catch (error) {
    throw error;
  }
};
