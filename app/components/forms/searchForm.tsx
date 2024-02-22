'use client';
import React, { FormEvent, useState } from 'react';
import Input from './input';
import { useForm } from 'react-hook-form';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchForm {
  query: string;
}

export default function SearchForm() {
  const { register } = useForm<SearchForm>();
  const [query, setQuery] = useState<string | null>();
  const router = useRouter();
  //   const params = useSearchParams();
  //   const query = params.get('query');
  const onValid = (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/products/search?query=${query}`);
  };
  return (
    <div className="max-w-72 w-full">
      <form onSubmit={onValid} className="p-0">
        <div className="relative m-0 p-0 flex">
          <Input
            required={true}
            type="text"
            name="search"
            placeholder="Search"
            errorMessage={null}
            register={register('query')}
            addClass="pr-8 m-0"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)
            }
          />
          <button type="submit">
            <IconSearch
              width={20}
              className="text-amber-800 absolute right-2 top-[50%] -translate-y-[50%]"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
