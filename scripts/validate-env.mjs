import { z } from 'zod'
import { config } from 'dotenv'

config({ path: '.env' })

const envSchema = z.object({
  NEXT_PUBLIC_KAKAO_REDIRECT_URI: z
    .string()
    .min(1, 'NEXT_PUBLIC_KAKAO_REDIRECT_URI is required')
    .url('NEXT_PUBLIC_KAKAO_REDIRECT_URI must be a valid URL'),
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
  console.error('✕ Environment variable validation failed.')
  console.error(result.error.flatten().fieldErrors)
  process.exit(1)
}

console.log('✓ Environment variables are valid.')
