import FingerprintJS from '@fingerprintjs/fingerprintjs';

/**
 * 클라이언트 고유 식별자(FingerprintJS ID) 가져오기
 * @returns 고유 식별자 문자열
 */
export async function getClientId(): Promise<string> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // FingerprintJS에서 생성된 고유 ID 반환
}