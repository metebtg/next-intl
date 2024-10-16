// @ts-check

import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.tsx');
const withMdx = createMDX({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: process.env.NEXT_PUBLIC_USE_CASE === 'trailing-slash',
  basePath:
    process.env.NEXT_PUBLIC_USE_CASE === 'base-path' ? '/base/path' : undefined,
  experimental: {
    staleTimes: {
      // Next.js 14.2 broke `locale-prefix-never.spec.ts`.
      // This is a workaround for the time being.
      dynamic: 0
    }
  }
};

export default withNextIntl(withMdx(nextConfig));
