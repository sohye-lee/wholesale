"use client";
import useRequest from "@/app/hooks/useRequest";
import { Category, Collection, Product } from "@/app/lib/types";
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
  useTransition,
} from "react";
import Input from "../input";
import { useForm } from "react-hook-form";
import Message from "../message";
import useSWR from "swr";
import swrFetcher from "@/app/lib/swrFetcher";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import Button from "../../UI/button/button";
import ImageSelector from "./imageSelector";

export interface ProductForm {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  productImages?: string[];
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  quantity: number;
  category: string;
  collection: string;
}

interface Props {
  initialValue?: ProductForm;
  onSubmit(values: any): void;
}

const defaultValue = {
  _id: "",
  title: "",
  description: "",
  thumbnail: "",
  bulletPoints: [""],
  mrp: 0,
  salePrice: 0,
  quantity: 0,
  category: "",
  collection: "",
};

export default function ProductCreateForm(props: Props) {
  const { initialValue, onSubmit } = props;
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [productInfo, setProductInfo] = useState({ ...defaultValue });
  const [thumbnailSource, setThumbnailSource] = useState<string[]>();
  const [productImagesSource, setProductImagesSource] = useState<string[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [collections, setCollections] = useState<Collection[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();
  const [createProduct, { data, error, loading }] = useRequest(
    "/api/products",
    "POST"
  );
  useState();
  const { data: categoriesData, error: categoriesError } = useSWR(
    "/api/categories",
    swrFetcher
  );
  const { data: collectionsData, error: collectionsError } = useSWR(
    "/api/collections",
    swrFetcher
  );

  const onValid = (validForm: Product) => {};
  // return (
  //   <form
  //     onSubmit={handleSubmit(onValid)}
  //     className="w-full border flex flex-col items-center border-stone-300 p-8 gap-3 bg-white"
  //   >
  //     {data?.ok ? (
  //       <Message mode="success" message={data?.message} />
  //     ) : (
  //       <Message mode="error" message={data?.message} />
  //     )}

  //     <h1 className="text-xl font-medium uppercase text-center mb-3">
  //       Upload a New Product
  //     </h1>
  //     <Input
  //       placeholder="name"
  //       name="name"
  //       register={register("title", { required: "This field is required." })}
  //       type="text"
  //       required={true}
  //       errorMessage={errors?.title?.message}
  //     />
  //     <Input
  //       placeholder="description"
  //       name="description"
  //       register={register("description")}
  //       type="text"
  //       required={true}
  //       errorMessage={errors?.description?.message}
  //     />
  //   </form>
  // );

  const fields = productInfo.bulletPoints;

  const addMoreBulletPoints = () => {
    setProductInfo({
      ...productInfo,
      bulletPoints: [...productInfo.bulletPoints, ""],
    });
  };

  const removeBulletPoint = (indexToRemove: number) => {
    const points = [...productInfo.bulletPoints];
    const filteredPoints = points.filter((_, index) => index !== indexToRemove);
    setProductInfo({
      ...productInfo,
      bulletPoints: [...filteredPoints],
    });
  };

  const updateBulletPointValue = (value: string, index: number) => {
    const oldValues = [...fields];
    oldValues[index] = value;

    setProductInfo({ ...productInfo, bulletPoints: [...oldValues] });
  };

  const removeImage = async (index: number) => {
    const newImages = images.filter((_, idx) => idx !== index);
    setImages([...newImages]);
  };

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Updating" : "Update";
    return isPending ? "Creating" : "Create";
  };

  useEffect(() => {
    if (initialValue) {
      setProductInfo({ ...initialValue });
      setThumbnailSource([initialValue?.thumbnail]);
      setProductImagesSource(initialValue?.productImages);
      setIsForUpdate(true);
    }
    categoriesData?.ok && setCategories(categoriesData?.categories);
    collectionsData?.ok && setCollections(collectionsData?.collections);
  }, [
    initialValue,
    categoriesData?.categories,
    collectionsData?.collections,
    categoriesData?.ok,
    collectionsData?.ok,
    collectionsData?.categories,
  ]);

  const onImagesChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const files = target.files;
    if (files) {
      const newImages = Array.from(files).map((item) => item);
      const oldImages = productImagesSource || [];
      setImages([...images, ...newImages]);
      setProductImagesSource([
        ...oldImages,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const files = target.files;
    if (files) {
      const file = files[0];
      setThumbnail(file);
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-5 text-2xl font-medium">Add new product</h1>

      <form
        action={() =>
          startTransition(async () => {
            await onSubmit({ ...productInfo, images, thumbnail });
          })
        }
        className="space-y-6"
      >
        <div className="space-y-3">
          <div>
            <h3 className="mb-0 p">Main Image</h3>
            <ImageSelector
              id="thumb"
              images={thumbnailSource}
              onChange={onThumbnailChange}
            />
          </div>
          <div>
            <h3>Images</h3>
            <ImageSelector
              multiple
              id="images"
              images={productImagesSource}
              onRemove={removeImage}
              onChange={onImagesChange}
            />
          </div>
        </div>

        <div>
          <h3>Title</h3>
          <Input
            label="Title"
            type="text"
            placeholder="Title"
            required={true}
            value={productInfo.title}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
              setProductInfo({ ...productInfo, title: currentTarget.value })
            }
          />
        </div>

        <div>
          <h3>Description</h3>
          <Input
            type="textarea"
            placeholder="Description"
            required={false}
            className="h-52"
            label="Description"
            value={productInfo.description}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
              setProductInfo({
                ...productInfo,
                description: currentTarget.value,
              })
            }
          />
        </div>

        <div className="w-full flex flex-col group relative">
          <div>
            <h3>Category</h3>
            <select
              className="peer w-full border border-stone-400 px-3 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:bg-white focus:ring-2 focus:ring-amber-800"
              onChange={(e: FormEvent<HTMLSelectElement>) => {
                setProductInfo({
                  ...productInfo,
                  category: e.currentTarget.value,
                });
              }}
              defaultValue=""
              name="category"
              value={productInfo.category}
              // label="Select Category"
            >
              <option disabled value="">
                Select
              </option>
              {categories &&
                categories.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col group relative">
          <h3>Collection</h3>
          <select
            name="collection"
            className="peer w-full border border-stone-400 px-3 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:bg-white focus:ring-2 focus:ring-amber-800"
            onChange={(e: FormEvent<HTMLSelectElement>) => {
              setProductInfo({
                ...productInfo,
                collection: e.currentTarget.value,
              });
            }}
            defaultValue=""
            value={productInfo.collection}
            // label="Select Category"
          >
            <option disabled value="">
              Select
            </option>
            {collections &&
              collections.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className=" ">
          <h3>Price</h3>

          <div className="flex items-stretch space-x-3">
            <div className="w-full">
              <Input
                type="number"
                required={true}
                value={productInfo.mrp}
                label="MRP"
                onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                  const mrp = +currentTarget.value;
                  setProductInfo({ ...productInfo, mrp });
                }}
                className="mb-4"
              />
              <span className="text-stone-700 text-xs">MRP</span>
            </div>

            <div className="w-full">
              <Input
                type="number"
                value={productInfo.salePrice}
                required={true}
                label="Sale Price"
                onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                  const salePrice = +currentTarget.value;
                  setProductInfo({ ...productInfo, salePrice });
                }}
                className="mb-4"
              />
              <span className="text-stone-700 text-xs">Sale Price</span>
            </div>
          </div>
        </div>

        <div className=" flex-1">
          <h3>Stock</h3>

          <Input
            value={productInfo.quantity}
            label="Qty"
            type="number"
            required={true}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
              const quantity = +currentTarget.value;
              if (!isNaN(quantity))
                setProductInfo({ ...productInfo, quantity });
            }}
            className="mb-4"
          />
        </div>

        <div>
          <h3>Bullet points</h3>
          <div className="w-full flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center w-full">
                <Input
                  type="text"
                  value={field}
                  label={`Bullet point ${index + 1}`}
                  required={false}
                  onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
                    updateBulletPointValue(currentTarget.value, index)
                  }
                  className="mb-4"
                />
                {fields.length > 1 ? (
                  <button
                    onClick={() => removeBulletPoint(index)}
                    type="button"
                    className="ml-1"
                  >
                    <IconTrash width="20" />
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <button
            disabled={isPending}
            type="button"
            onClick={addMoreBulletPoints}
            className="flex items-center space-x-1 mt-2 text-gray-800 ml-auto"
          >
            <IconPlus width={16} />
            <span className="font-medium">Add more</span>
          </button>
        </div>

        <Button size="medium" mode="save" disabled={isPending} type="submit">
          {getBtnTitle()}
        </Button>
      </form>
    </div>
  );
}
