'use client'

import { useSearchParams } from 'next/navigation'
import { fetchOneCountryData } from '@/sevices/users/CountryService'
import { useEffect, useState } from 'react'
import { countryData } from '@/components/country'
import Link from 'next/link'

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
  function extractBorder() {
    if (data?.borders) {
      const mapped = Object.entries(data?.borders).map(([key, value]) => ({
        key: Number(key),
        value
      }))
      return mapped.map((item) => item.value + '\n')
    }
  }

  function extractCurrencies() {
    if (data?.currencies) {
      const mapped = Object.entries(data?.currencies).map(([key, value]) => ({
        key: String(key),
        value
      }))
      return mapped.map((item) => item.value.name)
    }
  }

  function extractLanguages() {
    if (data?.languages) {
      const mapped = Object.entries(data?.languages).map(([key, value]) => ({
        key: String(key),
        value
      }))
      return mapped.map((item) => item.value + ' ')
    }
  }

  function extractNativeName() {
    if (data?.name.nativeName) {
      const mapped = Object.keys(data?.name.nativeName)
      const nativeName = mapped.map((key) => data.name.nativeName[key].common)
      return nativeName + ' '
    }
  }

  return (
    <div className="flex justify-center flex-col">
      <nav className="py-2 mb-4 bg-[rgb(36,35,35)] flex flex-col items-center">
        <Link href="/" className="border rounded-lg p-2">
          World View
        </Link>
      </nav>

      {data ? (
        <div className="flex flex-col items-center text-center">
          <a href={data.maps.openStreetMaps} target="_blank">
            {data && <img src={data.flags.svg} alt="flag" width={400}></img>}
          </a>
          <div className="text-4xl font-extrabold">{data?.name.common} </div>
          <div>{extractNativeName()}</div>
          <div>
            <p className="font-medium">tld :</p>
            {data && data.tld.map((item) => item + '\n')}
          </div>
          <div>
            <p>Latitude: </p> {data && data.latlng[0].toFixed(2)}°N
          </div>
          <div>
            <p>Longitude: </p>
            {data && data.latlng[1].toFixed(2)}°E
          </div>
          <div>
            <p>Aera:</p>
            {data && data.area + 'km²'}
          </div>
          <div>
            <p>Border:</p>
            {extractBorder()}
          </div>
          <div>
            <p>Capital:</p>
            {data.capital ? data?.capital[0] : 'none'}
          </div>
          <div>
            <p>Independent:</p>
            {data?.independent ? 'Yes' : 'No'}
          </div>
          <div>
            <p>un Member:</p>
            {data?.unMember ? 'Yes' : 'No'}
          </div>
          <div>
            <p>Population:</p>
            <p>{data?.population} People</p>
          </div>
          <div>
            <p>Currencies:</p>
            {extractCurrencies()}
          </div>
          <div>
            <p>Language(s):</p>
            {extractLanguages()}
          </div>
          <div>
            <p>Demonyms:</p>
            <p>
              {data?.demonyms.eng.f !== data?.demonyms.eng.m
                ? data?.demonyms.eng.f + 'and' + data?.demonyms.eng.m
                : data?.demonyms.eng.f}
            </p>
          </div>
          <div>
            <p>Gini:</p>
            {data.gini ? data?.gini[2018] : 'none'}
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-screen items-center w-full font-bold text-4xl">Loading...</div>
      )}
    </div>
  )
}
