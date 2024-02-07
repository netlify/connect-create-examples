import { defineStackbitConfig } from "@stackbit/types";
import { ContentfulContentSource } from "@netlify/connector-contentful";

const config = defineStackbitConfig({
  stackbitVersion: "0.6.0",
  ssgName: "nextjs",
  nodeVersion: "18",
  preInstallCommand: "npm install -g pnpm",
  installCommand: "pnpm install",
  postInstallCommand: "pnpm run --filter '@netlify/*' build",
  devCommand:
    "node_modules/.bin/next dev -- --port {PORT} --hostname 127.0.0.1",
  contentSources: [
    new ContentfulContentSource({
      managementToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      spaceId: process.env.CONTENTFUL_SPACE_ID!,
      previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
    }),
  ],
});

export default config;
