"use client";
import Button from "@components/UI/button/button";
import Container from "@components/UI/container/container";
import Input from "@components/forms/input";
import CateogryItem from "@components/items/cateogryItem";
import useRequest from "@hooks/useRequest";
import swrFetcher from "@lib/swrFetcher";
import { Category } from "@lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

// const swrfetcher = (url: string) => fetch(url).then((res) => res.json());

interface CategoryCreateForm {
  name: string;
}

export default function CategoryCreatePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryCreateForm>();
  const [createCategory, { data, error, loading }] = useRequest(
    "/api/categories",
    "POST"
  );

  const [message, setMessage] = useState<string | null>();

  const onValid = (validForm: CategoryCreateForm) => {
    createCategory(validForm);
  };

  const { data: categoriesData, error: categoriesError } = useSWR(
    "/api/categories",
    swrFetcher
  );

  const [categories, setCategories] = useState<Category[]>(
    categoriesData?.categories
  );

  const renderCategories =
    categories && categories.length > 0 ? (
      categories.map((c) => {
        return <CateogryItem category={c} key={c._id} />;
      })
    ) : (
      <p>No category yet. Please create one.</p>
    );

  useEffect(() => {
    data?.ok && toast.success(data?.message);
    data?.ok && setMessage(data?.message);
    setTimeout(() => {
      data?.ok && setMessage(null);
    }, 3000);
    categoriesData && setCategories(categoriesData.categories);
    categoriesData && router.refresh();
    categoriesData && reset();
  }, [
    categoriesData,
    data?.message,
    data?.ok,
    setCategories,
    data?.categories,
    categories,
    router,
    reset,
  ]);
  return (
    <Container width="small">
      <h1 className="text-2xl font-medium mb-3">Create A Category</h1>
      <form
        className="flex items-stretch gap-1"
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          type="text"
          name="name"
          register={register("name")}
          required={true}
          placeholder="category name"
          errorMessage={errors.name?.message || null}
        />
        <Button mode="success" size="small">
          Create
        </Button>
      </form>
      {message && <p className="text-xs text-amber-800 mt-1">{message}</p>}
      <hr className="my-5 border-stone-300" />
      {renderCategories}
    </Container>
  );
}
