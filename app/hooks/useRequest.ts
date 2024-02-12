"use client";
import { useState } from "react";

interface useRequestState {
  loading: boolean;
  error?: object;
  data?: any;
}

type useRequestResult = [(data: any) => void, useRequestState];
export default function useRequest(
  url: string,
  method: "POST" | "PUT" | "DELETE"
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, loading: false, data })))
      .catch((error) =>
        setState((prev) => ({ ...prev, loading: false, error }))
      )
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [func, { ...state }];
}
