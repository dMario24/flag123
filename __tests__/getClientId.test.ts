// Mock FingerprintJS
jest.mock('@fingerprintjs/fingerprintjs', () => require('../__mocks__/fingerprintjs'));

import { getClientId } from "../app/lib/getClientId";

describe('getClientId in browser-like environment', () => {
  // beforeAll(() => {
  //   // jsdom 환경을 초기화
  //   Object.defineProperty(window, 'navigator', {
  //     value: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  //     configurable: true,
  //   });
  // });

  it('should fetch a valid FingerprintJS visitorId', async () => {
    const clientId = await getClientId();

    // visitorId가 유효한 문자열인지 확인
    expect(clientId).toBeDefined();
    // expect(clientId).toHaveLength(32); // 길이가 32인지 확인
    // expect(clientId).toMatch(/^[a-zA-Z0-9]+$/); // 영숫자만 포함
  });
});
