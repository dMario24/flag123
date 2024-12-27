import { getEnv } from "../lib/utils";

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
