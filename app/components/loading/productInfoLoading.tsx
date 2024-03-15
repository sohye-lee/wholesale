import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function ProductInfoLoading() {
  return (
    <div>
      <Skeleton>
        <div className="w-full h-10 overflow-hidden relative bg-gray-300 mb-1 "></div>
        <div className="w-full h-10 overflow-hidden relative bg-gray-300 mb-3 "></div>
      </Skeleton>
      <Skeleton>
        <div className="w-full flex flex-col gap-1">
          <div className="relative h-8 aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative h-8 aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative h-8 aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative h-8  aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative h-8 aspect-square overflow-hidden bg-gray-300 "></div>
          <div className="relative w-2/3 h-8 aspect-square overflow-hidden bg-gray-300 "></div>
        </div>
      </Skeleton>
    </div>
  );
}
