"use client";
import Button from "@/app/components/UI/button/button";
import Container from "@/app/components/UI/container/container";
import Input from "@/app/components/forms/input";
import CollectionItem from "@components/items/collectionItem";
import useRequest from "@/app/hooks/useRequest";
import { Collection } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";

const swrfetcher = (url: string) => fetch(url).then((res) => res.json());

interface CollectionCreateForm {
  name: string;
}

export default function CollectionCreatePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollectionCreateForm>();
  const [createCollection, { data, error, loading }] = useRequest(
    "/api/collections",
    "POST"
  );

  const [message, setMessage] = useState<string | null>();

  const onValid = (validForm: CollectionCreateForm) => {
    createCollection(validForm);
    router.refresh();
  };

  const { data: collectionsData, error: collectionsError } = useSWR(
    "/api/collections",
    swrfetcher
  );

  const [collections, setCollections] = useState<Collection[]>(
    collectionsData?.categories
  );

  const renderCategories =
    collections && collections.length > 0 ? (
      collections.map((c) => {
        return <CollectionItem collection={c} key={c._id} />;
      })
    ) : (
      <p>No Collection yet. Please create one.</p>
    );

  useEffect(() => {
    data?.ok && toast.success(data?.message);
    data?.ok && setMessage(data?.message);
    setTimeout(() => {
      data?.ok && setMessage(null);
    }, 3000);
    collectionsData && setCollections(collectionsData.collections);
    collectionsData && router.refresh();
    collectionsData && reset();
  }, [
    collectionsData,
    data?.message,
    data?.ok,
    setCollections,
    data?.collections,
    collections,
    router,
    reset,
  ]);
  return (
    <Container width="small">
      <h1 className="text-2xl font-medium mb-3">Create A Collection</h1>
      <form
        className="flex items-stretch gap-1"
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          type="text"
          name="name"
          register={register("name")}
          required={true}
          placeholder="Collection name"
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
