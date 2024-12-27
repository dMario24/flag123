'use client';

import Link from 'next/link'
import React from "react";

export default function NotFound() {
  const handleCopy = () => {
    const text = "계엄사령부 포고령(제1호)\n\n자유대한민국 내부에 암약하고 있는 반국가세력의 대한민국 체제전복 위협으로부터 자유민주주의를 수호하고, 국민의 안전을 지키기 위해 2024년 12월 3일 23:00부로 대한민국 전역에 다음 사항을 포고합니다.\n\n1. 국회와 지방의회, 정당의 활동과 정치적 결사, 집회, 시위 등 일체의 정치활동을 금한다.\n2. 자유민주주의 체제를 부정하거나, 전복을 기도하는 일체의 행위를 금하고, 가짜뉴스, 여론조작, 허위선동을 금한다.\n3. 모든 언론과 출판은 계엄사의 통제를 받는다.\n4. 사회혼란을 조장하는 파업, 태업, 집회행위를 금한다.\n5. 전공의를 비롯하여 파업 중이거나 의료현장을 이탈한 모든 의료인은 48시간 내 본업에 복귀하여 충실히 근무하고 위반시는 계엄법에 의해 처단한다.\n6. 반국가세력 등 체제전복세력을 제외한 선량한 일반 국민들은 일상생활에 불편을 최소화할 수 있도록 조치한다.\n\n이상의 포고령 위반자에 대해서는 대한민국 계엄법 제 9조(계엄사령관 특별조치권)에 의하여 영장없이 체포, 구금, 압수수색을 할 수 있으며, 계엄법 제 14조(벌칙)에 의하여 처단한다.\n\n2024.12.3.(화)\n계엄사령관 육군대장 박안수";
    navigator.clipboard.writeText(text);
    alert("포고령 내용이 복사되었습니다.");
  };
  return (
    <div className="min-h-screen py-10 px-5 flex flex-col items-center">

      <div className="text-center text-red-600 hover:text-purple-700 text-4xl font-extrabold mb-6">
        <Link href={'/'}>404 not found</Link>
      </div>

      <div className="max-w-3xl shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4" onClick={handleCopy}>계엄사령부 포고령(제1호)</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          2024년 12월 3일 23:00부로 대한민국 전역에 다음 사항을 포고합니다.
        </p>

        <p className="mb-4">
          자유대한민국 내부에 암약하고 있는 반국가세력의 대한민국 체제전복 위협으로부터 자유민주주의를 수호하고,
          국민의 안전을 지키기 위해 아래의 조치를 시행합니다.
        </p>

        <ol className="list-decimal list-inside space-y-2">
          <li>
            국회와 지방의회, 정당의 활동과 정치적 결사, 집회, 시위 등 일체의 정치활동을 금한다.
          </li>
          <li>
            자유민주주의 체제를 부정하거나, 전복을 기도하는 일체의 행위를 금하고, 가짜뉴스, 여론조작, 허위선동을 금한다.
          </li>
          <li>모든 언론과 출판은 계엄사의 통제를 받는다.</li>
          <li>사회혼란을 조장하는 파업, 태업, 집회행위를 금한다.</li>
          <li>
            전공의를 비롯하여 파업 중이거나 의료현장을 이탈한 모든 의료인은 48시간 내 본업에 복귀하여 충실히 근무하고
            위반시는 계엄법에 의해 처단한다.
          </li>
          <li>
            반국가세력 등 체제전복세력을 제외한 선량한 일반 국민들은 일상생활에 불편을 최소화할 수 있도록 조치한다.
          </li>
        </ol>

        <p className="mt-6">
          이상의 포고령 위반자에 대해서는 대한민국 계엄법 제 9조(계엄사령관 특별조치권)에 의하여 영장없이 체포, 구금,
          압수수색을 할 수 있으며, 계엄법 제 14조(벌칙)에 의하여 처단한다.
        </p>

        <p className="mt-6 text-right">
          2024.12.3.(화)
          <br />
          계엄사령관 육군대장 박안수
        </p>
      </div>
    </div>

  )
}