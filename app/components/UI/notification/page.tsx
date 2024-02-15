"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconX } from "@tabler/icons-react";

interface useNotificationProps {
  mode: "info" | "success" | "error";
  message: string;
}

export default function Notification({ mode, message }: useNotificationProps) {
  const [open, setOpen] = useState(true);
  return (
    <>
      {open && (
        <div className="fixed bg-[rgba(0,0,0,.1)] w-screen h-screen flex items-center justify-center">
          {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
          <div className="bg-white px-8 py-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-100"
            >
              <IconX width={16} className="text-stone-700" />
            </button>
            <p className="text-center">{message}</p>
          </div>
        </div>
      )}
    </>
  );
}
