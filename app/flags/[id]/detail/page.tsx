import { fetchFlagById } from "@/app/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import MapSection from "@/app/ui/map/MapSection";
import {
  // FaFlag as Home, 
  FaTwitterSquare as Twitter,
  FaFacebookSquare as Facebook
} from "react-icons/fa";

import { FiHome as Home } from "react-icons/fi";

// https://react-icons.github.io/react-icons/icons/si/
// import { SiKakaotalk } from "react-icons/si";
import { headers } from "next/headers";
import { Metadata } from "next";
import Link from "next/link";

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

  const snsBtnSize = 33
  return (
    <div className="flex flex-col items-center p-6">
      {/* Flag Details Card */}
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">
            {flag.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={flag.img_url}
              alt={flag.name}
              width={300}
              height={300}
              className="rounded-md w-full max-w-md"
            />

            {/* SNS 공유 버튼 */}
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?url=${fullUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
              >
                <Twitter size={snsBtnSize} className="text-sky-400" />
              </a>
              <Link href="/" aria-label="Go to Home">
                <Home
                  size={snsBtnSize}
                  className="text-fuchsia-600"
                />
              </Link>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                <Facebook size={snsBtnSize} className="text-blue-700" />
              </a>


            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Section */}
      <MapSection latitude={latitude} longitude={longitude} />
    </div>
  );
}
