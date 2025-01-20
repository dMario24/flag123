import { fetchFlagsByParentId } from "@/app/lib/data";
import LikeableImage from "@/app/ui/gallery/likeable-image";

export default async function ParentImageGrid({ parentId, parentName }: { parentId: number, parentName: string }) {
  const childImages = await fetchFlagsByParentId(parentId);

  // TODO 형태소분석
  console.info("parentName", parentName);

  if (childImages.length === 0) {
    return <p className="text-center text-gray-500 animate-pulse text-2xl">(ෆ˙ᵕ˙ෆ) (◍•ᴗ•◍)</p>;
  }

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-4">
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{
          justifyContent: childImages.length < 4 ? "space-evenly" : "stretch",
        }}
      >
        {childImages.map((flag) => (
          <li key={flag.id} className="text-center">
            <LikeableImage flag={flag} />
            <p className="mt-2 text-pretty">{flag.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
