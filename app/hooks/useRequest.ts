"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import useNotification from "./useNotification";

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

  const { notify } = useNotification();
  function func(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        setState((prev) => ({ ...prev, loading: false, data }));
        // data?.message && toast.info(data?.message);
        data?.message &&
          notify({
            mode: data?.ok ? "success" : "error",
            message: data?.message,
          });
      })
      .catch((error) =>
        setState((prev) => ({ ...prev, loading: false, error }))
      )
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [func, { ...state }];
}
