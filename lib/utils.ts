import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCacheTimeout(defaultValue = 123): number {
  // 환경변수를 불러오고, 없으면 기본값 123을 사용하고, 숫자로 변환
  const timeout = process.env.NEXT_PUBLIC_CACHE_TIMEOUT_SECONDS;
  const parsedTimeout = timeout ? parseInt(timeout, 10) : defaultValue;

  // 유효한 숫자일 경우 반환, 아니면 기본값 123
  return isNaN(parsedTimeout) ? defaultValue : parsedTimeout;
}

export function getImageQuality(defaultValue = 75): number {
  const imageQuality = process.env.NEXT_PUBLIC_IMAGE_QUALITY;
  const parsedImageQuality = Number(imageQuality) || defaultValue;

  return parsedImageQuality;
}

export function isImageAllDownButtonEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_IMAGE_ALL_DOWN_BUTTON?.toLowerCase() === 'true';
}

export function getAuthHeaders(): Record<string, string> {
  const apiKey = process.env.NEXT_PUBLIC_F123_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing');
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

// 동작하지 않음
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
export function getEnv<T extends string | number | boolean>(
  name: string,
  defaultValue?: T
): T {
  console.log("Loaded environment variables:", process.env);
  const value = process.env[name];
  console.log("name:", name);
  console.log("eval:", value);

  if (value === undefined || value === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable "${name}" is missing`);
  }

  // 자동 타입 변환
  if (typeof defaultValue === "number") {
    const parsedNumber = Number(value);
    if (isNaN(parsedNumber)) {
      throw new Error(`Environment variable "${name}" is not a valid number: ${value}`);
    }
    return parsedNumber as T;
  } else if (typeof defaultValue === "boolean") {
    return (value.toLowerCase() === "true") as T;
  }

  return value as T;
}

export function getVersion(): string {
  const version = process.env.APP_VERSION || "living for today";
  return version;
}

export function getBaseCamp(): string {
  const version = process.env.BASE_CAMP || "living for today";
  return version;
}

/**
 * 주어진 URL 조각들을 하나의 URL로 결합합니다.
 * 
 * 이 함수는 여러 개의 문자열을 받아서, 각 문자열을 "/"로 구분하여 연결합니다.
 * 경로를 결합할 때, 각 경로 부분에 있는 불필요한 슬래시는 자동으로 처리되지 않으며,
 * 두 개 이상의 슬래시가 연속되는 경우 그대로 포함될 수 있습니다.
 *
 * 예시:
 * ```typescript
 * joinUrl("https://googl.shop", "releases", "v1", "index.html");
 * // 결과: "https://googl.shop/releases/v1/index.html"
 * ```
  * 테스트:
 * 이 함수를 테스트하려면 아래 명령어를 사용하세요:
 * ```bash
 * npx jest -t "should correctly join URL parts into a complete URL"
 * ```
 * 해당 명령어는 "should correctly join URL parts into a complete URL"라는 이름의 테스트를 실행합니다.
 * 
 * @param {...string} parts - 결합할 URL 경로의 각 부분을 나타내는 문자열들.
 * @returns {string} - 결합된 최종 URL 문자열.
 */
export function joinUrl(...parts: string[]): string {
  return parts.join("/");
}