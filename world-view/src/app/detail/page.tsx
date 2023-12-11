'use client'

import { useSearchParams } from 'next/navigation'

export default function mainDetailPage() {
  const searchParams = useSearchParams()

  const search = searchParams.get('ccn3')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
