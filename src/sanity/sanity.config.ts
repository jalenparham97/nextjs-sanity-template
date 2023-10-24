/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/admin/[[...index]].tsx` route
 */

import {
  dashboardTool,
  projectInfoWidget,
  projectUsersWidget,
} from '@sanity/dashboard';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel';
import { media } from 'sanity-plugin-media';

import { previewDocumentNode } from '@/sanity/plugins/previewPane';
import { productionUrl } from '@/sanity/plugins/productionUrl';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '@/sanity/sanity.api';
import { homeSchema } from '@/sanity/schemas/singletons/home.schema';

const title = 'Beyond Biths Admin';

const schemas = [homeSchema];

const schemaNames: string[] = [homeSchema.name];

export const PREVIEWABLE_DOCUMENT_TYPES = schemaNames;

export default defineConfig({
  basePath: '/admin',
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [...schemas],
  },
  plugins: [
    deskTool({
      structure: pageStructure(schemas),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // Vercel Deploy Dashboard
    dashboardTool({
      widgets: [vercelWidget(), projectInfoWidget(), projectUsersWidget()],
    }),
    // Image asset management
    media(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin(schemaNames),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
  ],
});
