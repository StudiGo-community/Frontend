export const DEFAULT_PROFILE_IMAGE_URL_LIST = [
  '/images/profiles/default-1.webp',
  '/images/profiles/default-2.webp',
  '/images/profiles/default-3.webp',
  '/images/profiles/default-4.webp',
  '/images/profiles/default-5.webp',
  '/images/profiles/default-6.webp',
  '/images/profiles/default-7.webp',
  '/images/profiles/default-8.webp',
] as const

export type DefaultProfileImageUrl =
  (typeof DEFAULT_PROFILE_IMAGE_URL_LIST)[number]

export function isDefaultProfileImageUrl(
  value: string
): value is DefaultProfileImageUrl {
  return DEFAULT_PROFILE_IMAGE_URL_LIST.includes(
    value as DefaultProfileImageUrl
  )
}

export const DEFAULT_PROFILE_IMAGE_URL: DefaultProfileImageUrl =
  '/images/profiles/default-1.webp'
