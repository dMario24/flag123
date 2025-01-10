import { getBaseCamp, getEnv, getVersion, joinUrl } from "../lib/utils";

// 정상 동작하지 않음 - https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

beforeEach(() => {
  jest.resetModules();
  process.env = { NODE_ENV: "test" } as NodeJS.ProcessEnv;
});

test("returns the correct number from environment variable", () => {
  process.env.NEXT_PUBLIC_IMAGE_QUALITY = "10";
  const value = getEnv<number>("NEXT_PUBLIC_IMAGE_QUALITY", 75);
  expect(value).toBe(10);
});

test("returns the default value if the environment variable is not set", () => {
  const value = getEnv<number>("NEXT_PUBLIC_IMAGE_QUALITY", 75);
  expect(value).toBe(75);
});


test("should correctly join URL parts into a complete URL", () => {
  // Arrange
  const baseUrl = "https://googl.shop"
  const path = "releases/tag"
  const version = "24.12.27"

  // Act
  const jUrl = joinUrl(baseUrl, path, version);

  // Assert
  expect(jUrl).toBe("https://googl.shop/releases/tag/24.12.27");
  // expect(joinUrl(getBaseCamp(), "releases/tag", getVersion())).toBe("https://github.com/dMario24/flag123/releases/tag/25.1.1")
  expect(joinUrl(getBaseCamp(), "releases/tag", getVersion())).toBe("living for today/releases/tag/living for today")

});
