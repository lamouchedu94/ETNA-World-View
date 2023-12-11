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
  // function displayBorder() {
  //   if (data && Array.isArray(data.border)) {
  //     let res = ''
  //     for (const val of data.border) {
  //       res += val
  //     }
  //     return res
  //   } else {
  //     // Gérez le cas où data.border n'est pas défini ou n'est pas un tableau
  //     console.error("data.border n'est pas un tableau ou n'est pas défini.")
  //   }
  // }
  function test() {
    if (data?.borders) {
      const mapped = Object.entries(data?.borders).map(([key, value]) => ({
        key: Number(key),
        value
      }))
      return mapped.map((item) => item.value + '\n')
    }
  }

  return (
    <div className="flex justify-center">
      <div className="text-center">
        {data && <img src={data.flags.svg} alt="flag" width={400}></img>}
        <div className="text-4xl font-extrabold">{data?.name.common} </div>
        <div className="flex">
          <p className="font-medium">tld :</p>
          {data && data.tld.map((item) => item + '\n')}
        </div>
        <div>
          <p>Latitude: </p> {data && data.latlng[0]}
        </div>
        <div>
          <p>Longitude: </p>
          {data && data.latlng[1]}
        </div>
        <div>
          <p>Aera:</p>
          {data && data.area + 'km²'}
        </div>
        <div>
          <p>Border:</p>
          {test()}
        </div>
      </div>
    </div>
  )
}
