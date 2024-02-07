import { ContentfulContentSource as ContentfulContentSourceOrig } from "@stackbit/cms-contentful";
import type { ContentEngineConfig } from "@stackbit/types";
import { dirname, join } from "node:path";
export interface ContentfulConnectorOptions {
  managementToken: string;
  spaceId: string;
  previewToken: string;
  typePrefix?: string;
}

export class ContentfulContentSource extends ContentfulContentSourceOrig {
  private pluginConfig: ContentEngineConfig;

  constructor(options: ContentfulConnectorOptions) {
    super({
      accessToken: options.managementToken,
      spaceId: options.spaceId,
      previewToken: options.previewToken,
      environment: `master`
    });
    this.pluginConfig = {
      connector: "@netlify/connector-contentful",
      plugins: [
        {
          resolve: join(dirname(__dirname), "package.json"),
          options: {
            accessToken: options.previewToken,
            host: `preview.contentful.com`,
            spaceId: options.spaceId,
          },
        },
        require.resolve("gatsby-plugin-image/package.json"),
      ],
    };
  }

  public getContentEngineConfig(): ContentEngineConfig {
    return this.pluginConfig;
  }
}