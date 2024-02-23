import React from "react";

interface MessageProps {
  message: string | null;
  mode?: "success" | "info" | "error";
}
export default function Message({ message, mode = "error" }: MessageProps) {
  return message ? (
    <span
      className={`text-xs ${
        mode == "success"
          ? "text-blue-600"
          : mode == "info"
          ? "text-emerald-600"
          : "text-amber-800"
      }`}
    >
      {message}
    </span>
  ) : null;
}
