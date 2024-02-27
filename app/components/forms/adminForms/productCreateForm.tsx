"use client";
import useRequest from "@/app/hooks/useRequest";
import {
  Category,
  Collection,
  NewProductData,
  ProductForm,
} from "@/app/lib/types";
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

interface Props {
  initialValue?: ProductForm;
  onSubmit(values: NewProductData): void;
}

const defaultValue = {
  title: "",
  description: "",
  thumbnail: "",
  bulletpoints: [""],
  base: 0,
  discounted: 0,
  quantity: 0,
  categoryId: "",
  collectionId: "",
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
  const [categoryId, setCategoryId] = useState<string>();
  const [collectionId, setCollectionId] = useState<string>();
  const [categories, setCategories] = useState<Category[]>();
  const [collections, setCollections] = useState<Collection[]>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewProductData>({
    reValidateMode: "onChange",
  });

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

  const fields = productInfo.bulletpoints;

  const addMoreBulletPoints = () => {
    setProductInfo({
      ...productInfo,
      bulletpoints: [...productInfo.bulletpoints, ""],
    });
  };

  const removeBulletPoint = (indexToRemove: number) => {
    const points = [...productInfo.bulletpoints];
    const filteredPoints = points.filter((_, index) => index !== indexToRemove);
    setProductInfo({
      ...productInfo,
      bulletpoints: [...filteredPoints],
    });
  };

  const updateBulletPointValue = (value: string, index: number) => {
    const oldValues = [...fields];
    oldValues[index] = value;

    setProductInfo({ ...productInfo, bulletpoints: [...oldValues] });
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
      setProductImagesSource(initialValue?.images);
      setIsForUpdate(true);
      setCategoryId(initialValue?.categoryId);
      setCollectionId(initialValue?.collectionId);
    }
    categoriesData?.ok && setCategories(categoriesData?.categories);
    collectionsData?.ok && setCollections(collectionsData?.collections);
  }, [
    initialValue,
    categoriesData?.ok,
    collectionsData?.ok,
    categoriesData?.categories,
    collectionsData?.collectionIds,
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

  const onValid = () => {
    startTransition(async () => {
      await onSubmit({ ...productInfo, images, thumbnail });
    });
  };

  useEffect(() => {
    // console.log("watch", watch());
    // console.log("errors", errors);
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-5 text-2xl font-medium">Add new product</h1>

      <form
        action={() =>
          startTransition(async () => {
            await onSubmit({ ...productInfo, images, thumbnail });
          })
        }
        // onSubmit={handleSubmit(onValid)}
        className="space-y-6"
      >
        <div className="space-y-3">
          <div>
            <h3 className="mb-0 p">Main Image</h3>
            <ImageSelector
              {...register("thumbnail")}
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
              {...register("images")}
              images={productImagesSource}
              onRemove={removeImage}
              onChange={onImagesChange}
            />
          </div>
        </div>

        <div>
          <h3>Title</h3>
          <Input
            {...register("title")}
            label="Title"
            type="text"
            placeholder="Title"
            required={true}
            value={productInfo.title}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) =>
              setProductInfo({ ...productInfo, title: currentTarget.value })
            }
            errorMessage={errors?.title?.message}
          />
        </div>

        <div>
          <h3>Description</h3>
          <Input
            {...register("description")}
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
            errorMessage={errors?.description?.message}
          />
        </div>

        <div className="w-full flex flex-col group relative">
          <div>
            <h3>Category</h3>
            <select
              // {...register("categoryIdId", {
              //   required: "You must select a categoryId.",
              //   // validate: (string: string) => string != "",
              // })}
              className="peer w-full border border-stone-400 px-3 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:bg-white focus:ring-2 focus:ring-amber-800"
              onChange={(e: FormEvent<HTMLSelectElement>) => {
                setProductInfo({
                  ...productInfo,
                  categoryId: e.currentTarget.value,
                });
              }}
              name="categoryId"
              value={productInfo.categoryId || ""}
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
            {errors?.categoryId?.message && (
              <Message message={errors?.categoryId?.message} mode="error" />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col group relative">
          <h3>Collection</h3>
          <select
            {...register("collectionId", {
              required: "You must select a collectionId.",
              // validate: (string: string) => string != "",
            })}
            name="collectionId"
            className="peer w-full border border-stone-400 px-3 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:bg-white focus:ring-2 focus:ring-amber-800"
            onChange={(e: FormEvent<HTMLSelectElement>) => {
              setProductInfo({
                ...productInfo,
                collectionId: e.currentTarget.value,
              });
            }}
            value={productInfo.collectionId || ""}
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
          {errors?.collectionId?.message && (
            <Message message={errors?.collectionId?.message} mode="error" />
          )}
        </div>

        <div className=" ">
          <h3>Price</h3>

          <div className="flex items-stretch space-x-3">
            <div className="w-full">
              <Input
                {...register("base")}
                type="number"
                required={true}
                value={productInfo.base}
                label="MRP"
                onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                  const base = +currentTarget.value;
                  setProductInfo({ ...productInfo, base });
                }}
                errorMessage={errors?.base?.message}
                className="mb-4"
              />
              <span className="text-stone-700 text-xs">MRP</span>
            </div>

            <div className="w-full">
              <Input
                {...register("discounted")}
                type="number"
                value={productInfo.discounted}
                required={true}
                label="Sale Price"
                onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
                  const discounted = +currentTarget.value;
                  setProductInfo({ ...productInfo, discounted });
                }}
                className="mb-4"
                errorMessage={errors?.discounted?.message}
              />
              <span className="text-stone-700 text-xs">Sale Price</span>
            </div>
          </div>
        </div>

        <div className=" flex-1">
          <h3>Stock</h3>

          <Input
            {...register("quantity", {
              // required: "This field is required.",
              min: {
                value: 0,
                message: "Should be bigger than 0.",
              },
            })}
            value={productInfo.quantity}
            label="Qty"
            type="number"
            required={true}
            onChange={({ currentTarget }: FormEvent<HTMLInputElement>) => {
              const quantity = +currentTarget.value;
              if (!isNaN(quantity))
                setProductInfo({ ...productInfo, quantity });
            }}
            errorMessage={errors?.quantity?.message}
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

        <Button
          size="medium"
          mode="save"
          disabled={Object.keys(errors).length != 0}
          loading={loading}
          type="submit"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
