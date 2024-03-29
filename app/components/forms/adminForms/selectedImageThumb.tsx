import Image from "next/image";

interface Props {
  src?: string;
}

const SelectedImageThumb = ({ src }: Props) => {
  if (!src) return null;

  return (
    <div className="w-20 h-20 relative">
      <Image
        src={src}
        alt="product"
        fill
        className=" h-auto w-auto min-h-full min-w-full bg-blue-gray-200"
      />
    </div>
  );
};

export default SelectedImageThumb;
