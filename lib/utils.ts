import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCacheTimeout(): number {
  // 환경변수를 불러오고, 없으면 기본값 123을 사용하고, 숫자로 변환
  const timeout = process.env.NEXT_PUBLIC_CACHE_TIMEOUT_SECONDS;
  const parsedTimeout = timeout ? parseInt(timeout, 10) : 123;

  // 유효한 숫자일 경우 반환, 아니면 기본값 123
  return isNaN(parsedTimeout) ? 123 : parsedTimeout;
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

export function getEnv<T extends string | number | boolean>(
  name: string,
  defaultValue?: T
): T {
  const value = process.env[name];

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