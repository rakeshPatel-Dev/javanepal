import type { NextConfig } from "next"
import withSerwistInit from "@serwist/next"

const config: NextConfig = {}

export default withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
})(config)
