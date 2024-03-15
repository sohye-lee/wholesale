import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function ProductImageLoading() {
  return (
    <div>
      <Skeleton>
        <div className="w-full aspect-square overflow-hidden relative bg-gray-300 mb-1 "></div>
      </Skeleton>
      <Skeleton>
        <div className="w-full grid grid-cols-4 gap-1">
          <div className="relative aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative aspect-square overflow-hidden bg-gray-300 "></div>
        </div>
      </Skeleton>
    </div>
  );
}
