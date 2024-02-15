'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface useRequestState {
  loading: boolean;
  error?: object;
  data?: any;
}

type useRequestResult = [(data: any) => void, useRequestState];
export default function useRequest(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE'
): useRequestResult {
  const [state, setState] = useState<useRequestState>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  function func(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        setState((prev) => ({ ...prev, loading: false, data }));
        data?.message && toast.info(data?.message);
      })
      .catch((error) =>
        setState((prev) => ({ ...prev, loading: false, error }))
      )
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [func, { ...state }];
}
