import { fetchFlagsByParentId } from "@/app/lib/data";
import LikeableImage from "@/app/ui/gallery/likeable-image";

export default async function ParentImageGrid({ parentId }: { parentId: number }) {
  const parentImages = await fetchFlagsByParentId(parentId);

  if (parentImages.length === 0) {
    return <p className="text-center text-gray-500">부모 이미지가 없습니다.</p>;
  }

  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      aria-label="Parent Images"
    >
      {parentImages.map((flag) => (
        <LikeableImage key={flag.id} flag={flag} detailButtonEnabled />
      ))}
    </div>
  );
}
