import { redirect, RedirectType } from 'next/navigation'

export default async function Page() {
  redirect('/community', RedirectType.replace)
}
