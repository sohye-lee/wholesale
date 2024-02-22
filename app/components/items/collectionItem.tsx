"use client";
import { Collection } from "@/app/lib/types";
import { IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Button from "../UI/button/button";
import useRequest from "@/app/hooks/useRequest";
import { useRouter } from "next/navigation";
import Input from "../forms/input";
import { useForm } from "react-hook-form";

interface CollectionItemProps {
  collection: Collection;
}

interface EditCollectionForm {
  name: string;
  description?: string;
}
export default function CollectionItem({ collection }: CollectionItemProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm<EditCollectionForm>();
  const [
    deleteCollection,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useRequest(`/api/collections/${collection._id}/delete`, "DELETE");
  const [
    editCollection,
    { data: editData, error: editError, loading: editLoading },
  ] = useRequest(`/api/collections/${collection._id}/edit`, "PUT");
  const onDelete = () => {
    deleteCollection({ _id: collection._id });
    router.refresh();
  };

  const onEdit = (validForm: EditCollectionForm) => {
    editCollection(validForm);
    router.refresh();
    reset();
  };
  useEffect(() => {
    deleteData?.ok && setDeleteOpen(false);
    editData?.ok && setEditOpen(false);
    editData?.ok && router.refresh();
    deleteData?.ok && router.refresh();
  }, [deleteData?.ok, deleteCollection, editCollection, editData?.ok, router]);
  return (
    <>
      <div className="w-full mb-1 bg-stone-100 px-3 py-4 border border-stone-100 hover:border-stone-300 flex items-center justify-between">
        {collection.name}
        <div className="flex items-center gap-3">
          <button onClick={() => setEditOpen(true)}>
            <IconPencil width={20} className="hover:text-emerald-600" />
          </button>
          <button onClick={() => setDeleteOpen(true)}>
            <IconTrash width={20} className="hover:text-red-600" />
          </button>
        </div>
      </div>
      {editOpen && (
        <div className=" fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center pb-20 bg-[rgba(0,0,0,.2)]">
          <div className="bg-white p-12 flex items-center justify-center flex-col relative">
            <button
              onClick={() => setEditOpen(false)}
              className="absolute top-2 right-2 rounded-full border border-stone-800 flex items-center justify-center w-6 h-6"
            >
              <IconX width={16} />
            </button>
            <h3 className="text-md mb-3">Edit Collection</h3>
            <form
              onSubmit={handleSubmit(onEdit)}
              className="min-w-[300px] flex flex-col gap-2"
            >
              <Input
                register={register("name", {
                  required: "Collection name is required.",
                })}
                type="text"
                placeholder="Collection name"
                errorMessage={errors.name?.message || null}
                required={true}
                defaultValue={collection.name}
              />
              <Input
                register={register("description")}
                type="text"
                placeholder="Description"
                errorMessage={errors.name?.message || null}
                required={false}
                defaultValue={collection.description}
              />
              <div className="flex items-stretch justify-center gap-3 mt-3">
                <Button
                  size="small"
                  mode="neutral"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button size="small" mode="save">
                  Update
                </Button>
              </div>
            </form>
            {!editData?.ok && (
              <span className="text-xs text-center text-amber-700">
                {editData?.message}
              </span>
            )}
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className=" fixed z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center pb-20 bg-[rgba(0,0,0,.2)]">
          <div className="bg-white p-12 flex items-center justify-center flex-col relative">
            <button
              onClick={() => setDeleteOpen(false)}
              className="absolute top-2 right-2 rounded-full border border-stone-800 flex items-center justify-center w-6 h-6"
            >
              <IconX width={16} />
            </button>
            <h3 className="text-md mb-3">Are you sure you want to delete?</h3>
            <div className="flex items-stretch justify-center gap-3">
              <Button
                size="small"
                mode="neutral"
                onClick={() => setDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button size="small" mode="danger" onClick={onDelete}>
                Delete
              </Button>
            </div>
            {!deleteData?.ok && (
              <span className="text-xs text-center text-amber-700">
                {deleteData?.message}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
