const mockFingerprintJS = {
  load: jest.fn().mockResolvedValue({
    get: jest.fn().mockResolvedValue({ visitorId: 'mockedVisitorId1234567890123456' }),
  }),
};

export default mockFingerprintJS;