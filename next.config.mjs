import {withSentryConfig} from "@sentry/nextjs";
import { readFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));

function getBuildTime() {
  // 현재 날짜 및 시간 (서울 시간대)
  const date = new Date();

  // 서울 시간으로 포맷 (ISO 8601 형식으로)
  const buildTime = date.toLocaleString("en-GB", {
    timeZone: "Asia/Seoul",
    hour12: false,
    timeZoneName: "short"
  }).replace(",", "").replace(" GMT+9", "+09:00");

  return `${buildTime.replace(/\/+/g, "-").replace(/\s+/g, "T")}`;
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },

  output: "standalone", // docker

  env: {
    APP_VERSION: packageJson.version,
    // BASE_CAMP: "https://github.com/ppabam/FlagForFreedom",
    BASE_CAMP: "https://github.com/dMario24/flag123",
    COMMIT_HASH: commitHash,
    BUILD_TIME: getBuildTime(),
  },

  async headers() {
    return [
      {
        source: "/:path*(.webp|.jpg|.jpeg|.png|.gif|.svg)", // Apply cache control to image paths
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 365일 캐시 설정
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "sentry-vercel-tom",
project: "sentry-vercel-f123",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});