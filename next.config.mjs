/** @type {import('next').NextConfig} */
const nextConfig = {
  // 메인 페이지를 community로 설정
  async redirects() {
    return [
      {
        source: '/',
        destination: '/community',
        permanent: true,
      },
    ]
  },

  // Turbopack 사용 시 SVG를 React 컴포넌트로 import 가능하게 설정
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'], // svg → React 컴포넌트
        as: '*.js',
      },
    },
  },

  // Webpack 사용 시에도 동일하게 SVG 처리
  webpack(config) {
    // 기존 svg 처리 rule(file-loader 등) 찾기
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule?.test?.test?.('.svg')
    )

    // 1. ?url 이 붙은 svg는 "파일 URL 문자열"로 import
    // 예: import iconUrl from './icon.svg?url'
    config.module.rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    })

    // 2. 기본 svg import는 SVGR을 통해 React 컴포넌트로 처리
    // 예: import Icon from './icon.svg'
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule?.issuer,
      resourceQuery: { not: [/url/] },
      use: ['@svgr/webpack'],
    })

    // 기존 file-loader가 svg를 처리하지 않도록 제외
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default nextConfig
