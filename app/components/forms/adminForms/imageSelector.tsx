"use client";
import React, { ChangeEventHandler, useEffect } from "react";
import { IconTrash, IconPhoto } from "@tabler/icons-react";
import SelectedImageThumb from "./selectedImageThumb";
import ImageInput from "./imageInput";

// import ImageInput from ;
// import SelectedImageThumb from "@ui/SelectedImageThumb";

interface Props {
  id: string;
  images?: string[];
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onRemove?(index: number): void;
}

export default function ImageSelector({
  id,
  images,
  onChange,
  onRemove,
  multiple,
}: Props) {
  const icon = multiple ? (
    <div className="relative">
      <IconPhoto className="w-8 h-8 bg-white translate-1" />
      <IconPhoto className="w-8 h-8 absolute -top-1 -right-1 -z-10" />
    </div>
  ) : (
    <IconPhoto className="w-8 h-8" />
  );
  !multiple && console.log("images:", images);
  return (
    <div
      className={`flex items-center ${
        (multiple || (!multiple && images)) && "space-x-2"
      }`}
    >
      {images?.map((img, index) => {
        return (
          <div key={index} className="relative">
            <SelectedImageThumb src={img} />
            {multiple ? (
              <div
                onClick={() => onRemove && onRemove(index)}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded cursor-pointer"
              >
                <IconTrash className="w-4 h-4" />
              </div>
            ) : null}
          </div>
        );
      })}

      <ImageInput id={id} onChange={onChange} multiple={multiple} className="">
        {icon}
      </ImageInput>
    </div>
  );
}
