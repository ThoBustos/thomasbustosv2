import { Resend } from 'resend'
import { env } from '@/lib/env'

export function getResendClient() {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(env.RESEND_API_KEY)
}
