'use client';
import Button from '@/app/components/UI/button/button';
import Container from '@/app/components/UI/container/container';
import Input from '@/app/components/forms/input';
import useRequest from '@/app/hooks/useRequest';
import { CategoryDocument } from '@/app/lib/types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface CategoryCreateForm {
  name: string;
}

export default function CategoryCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryCreateForm>();
  const [createCategory, { data, error, loading }] = useRequest(
    '/api/categories',
    'POST'
  );

  const [message, setMessage] = useState<string | null>();

  const onValid = (validForm: CategoryCreateForm) => {
    createCategory(validForm);
  };

  const { data: categoriesData, error: categoriesError } =
    useSWR('/api/categories');

  const [categories, setCategories] = useState<CategoryDocument[]>(
    categoriesData?.categories
  );

  const renderCategories =
    categories && categories.length > 0 ? (
      categories.map((c) => {
        return <div key={c.name}>{c.name}</div>;
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

    const res = fetch('/api/categories')
      .then(async (res) => await res.json())
      .then((data) => setCategories(data.categories));
  }, [categoriesData, data?.message, data?.ok]);
  return (
    <Container width="small">
      <h1 className="text-2xl font-semibold mb-3">Create A Category</h1>
      <form
        className="flex items-stretch gap-1"
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          type="text"
          name="name"
          register={register('name')}
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
