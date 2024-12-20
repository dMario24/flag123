
import { Flag } from "@/app/lib/definitions";
import Image from "next/image";

export default function LikeableImage({ flag }: { flag: Flag }) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-gray-800 aspect-square">
      <Image
        src={flag.img_url}
        alt={flag.name}
        width={300}
        height={300}
        className="w-full h-full object-cover transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
}