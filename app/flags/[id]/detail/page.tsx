import { fetchFlagById } from "@/app/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import MapSection from "@/app/ui/map/MapSection";
import {
  FaSearch as Home,
  FaTwitterSquare as Twitter,
  FaFacebookSquare as Facebook,
  FaEdit as Edit,
} from "react-icons/fa";
import { GiBugNet as Bug } from "react-icons/gi";
import ParentImageGrid from "@/app/ui/detail/ParentImageGrid";

// https://react-icons.github.io/react-icons/icons/si/
// import { SiKakaotalk } from "react-icons/si";
import { headers } from "next/headers";
import { Metadata } from "next";
import LikeableImage from "@/app/ui/gallery/likeable-image";

import TooltipIcon from "@/app/ui/detail/reusable-tooltip-icon";
import IsAdminBtn from "@/app/ui/detail/is-admin-but";

// ✅ Open Graph 메타데이터 동적 생성
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const flag = await fetchFlagById(id);

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const fullUrl = `${protocol}://${host}/flags/${id}/detail`;
  const description = "계엄배 천하제일 깃발대회"

  return {
    title: `${flag.name} - 상세 정보`,
    description: description,
    openGraph: {
      title: flag.name,
      description: description,
      url: fullUrl,
      images: [
        {
          url: flag.img_url,
          width: 800,
          height: 600,
          alt: flag.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: flag.name,
      description: description,
      images: [flag.img_url],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const flag = await fetchFlagById(id);
  const { latitude, longitude } = flag;

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  // 전체 URL 구성
  const fullUrl = `${protocol}://${host}/flags/${params.id}/detail`;

  return (
    <div className="flex flex-col items-center p-6">
      {/* Flag Details Card */}
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">
            {flag.name}
          </CardTitle>
          <CardDescription className="text-center">
            <a
              href={flag.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block max-w-full truncate text-blue-500 hover:underline"
              title={flag.source}  // 전체 URL 툴팁 제공
            >
              🌐rigin: {flag.source}
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <LikeableImage flag={flag} detailButtonEnabled={false} />

            {/* SNS 공유 버튼 */}
            <div className="flex gap-4">
              <TooltipIcon tooltip="공유하기:Twitter" href={`https://twitter.com/intent/tweet?url=${fullUrl}`}
                icon={Twitter} iColor="text-sky-400" />

              <TooltipIcon tooltip="공유하기:Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`}
                icon={Facebook} iColor="text-blue-700" />

              <TooltipIcon tooltip="홈 및 검색" link={`/?sort=shuffle`} icon={Home} iColor="text-fuchsia-600" />

              <TooltipIcon tooltip="수정 및 출처 남기기" link={`/flags/${flag.id}/edit`} icon={Edit} iColor="text-lime-600" />

              <TooltipIcon tooltip="신고" link={`/flags/${flag.id}/detail`} icon={Bug} iColor="text-yellow-600" />
              
              {/* 로그인된 사용자만 삭제 버튼 표시 */}
              <IsAdminBtn flagId={flag.id} />

            </div>

          </div>
        </CardContent>
      </Card>

      <ParentImageGrid parentId={flag.id} parentName={flag.name}  />

      {/* Map Section */}
      <MapSection latitude={latitude} longitude={longitude} />
    </div>
  );
}
