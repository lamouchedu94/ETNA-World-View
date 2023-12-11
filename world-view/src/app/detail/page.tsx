'use client'

import { useSearchParams } from 'next/navigation'
import { fetchOneCountryData } from '@/sevices/users/CountryService'
import { useEffect, useState } from 'react'
import { countryData } from '@/components/country'

export default function mainDetailPage() {
  const [ccn3, setccn3] = useState<string | null>('')
  const [data, setData] = useState<countryData>()
  const searchParams = useSearchParams()
  useEffect(() => {
    setccn3(searchParams.get('ccn3'))
  }, [])
  useEffect(() => {
    if (ccn3 !== null) {
      fetchOneCountryData(ccn3).then((d) => {
        setData(d)
      })
    }
  }, [ccn3])

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <div>{data && <img src={data.flags.svg} alt="flag" width={400}></img>}</div>
}
