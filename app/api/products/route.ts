import startDb from '@/app/lib/db';
import ProductModel from '@/app/models/productModel';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    await startDb();
    const products = await ProductModel.find({})
    .populate({ path: 'categoryId', model: 'Category' })
    .populate({ path: 'collectionId', model: 'Collection' })
    // .populate("collectionId");

    return NextResponse.json({
      ok: true,
      message: 'Successfully loaded',
      products,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: 'Something went wrong.',
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const product = await ProductModel.create({
      ...data,
    });

    return NextResponse.json({
      ok: true,
      message: 'Successfully created!',
      product,
    });
  } catch (error) {
    console.log(error);
  }
};
