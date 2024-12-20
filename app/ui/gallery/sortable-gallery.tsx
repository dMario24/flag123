
import { Flag } from "@/app/lib/definitions";
import LikeableImage from "./likeable-image";

interface FlagsProps {
  filteredFlags: Flag[];
}

export default function SortableGallery({ filteredFlags }: FlagsProps) {
  return (
    <section className="container mx-auto px-1 py-1">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredFlags.map((flag) => (
          <li key={flag.id} className="text-center">
            <LikeableImage flag={flag} />
            {/* 플래그 이름 */}
            <p className="mt-2 text-pretty font-bold"> {flag.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}