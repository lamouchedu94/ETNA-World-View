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
      return mapped.map((item) => item.value.name + ' ' + item.value.symbol)
    }
  }

  function extractNativeName() {
    if (data?.name.nativeName) {
      const mapped = Object.keys(data?.name.nativeName)
      const nativeName = mapped.map((key) => data.name.nativeName[key].common)
      return nativeName + ' '
    }
  }
  const nname = extractNativeName()?.split(',')
  return (
    <div className="flex justify-center flex-col">
      <nav className="py-2 mb-4 bg-[rgb(36,35,35)] flex flex-col items-center">
        <Link href="/" className="border rounded-lg p-2">
          World View
        </Link>
      </nav>

      {data ? (
        <div className="flex flex-row justify-center items-center text-center">
          <div className="flex flex-col m-4">
            <a href={data.maps.openStreetMaps} target="_blank">
              {data && <img src={data.flags.svg} alt="flag" width={400}></img>}
            </a>
            <div className="mt-2 text-4xl font-extrabold">{data?.name.common} </div>
          </div>
          <div className="flex  border p-4 rounded-2xl">
            {/* GROUP 1 */}
            <div className="m-5">
              <div className="mb-2">
                <p className="font-bold">Commun:</p>
                {nname ? nname.map((item, i) => <ul key={i}>{item}</ul>) : ''}
              </div>
            </div>
            {/* GROUP 2 */}
            <div className="m-5">
              <p>Geo data</p>
              <div className="mb-2">
                <p className="font-bold">Capital:</p>
                {data.capital ? data?.capital[0] : 'none'}
              </div>
              <div className="mb-2">
                <p className="font-bold">Aera:</p>
                {data && data.area + 'km²'}
              </div>
              <div>
                <p className="font-bold">Latitude: </p> {data && data.latlng[0].toFixed(2)}°N
              </div>
              <div className="mb-2">
                <p className="font-bold">Longitude: </p>
                {data && data.latlng[1].toFixed(2)}°E
              </div>
              <div className="mb-2">
                <p className="font-bold">Border:</p>
                {extractBorder()}
              </div>
            </div>
            {/* GROUP 3 */}
            <div className="m-5">
              <p>Political</p>
              <div className="mb-2">
                <p className="font-bold">Independent:</p>
                {data?.independent ? 'Yes' : 'No'}
              </div>
              <div className="mb-2">
                <p className="font-bold">un Member:</p>
                {data?.unMember ? 'Yes' : 'No'}
              </div>
              <div>
                <p className="font-bold">Gini:</p>
                {data.gini ? Object.keys(data?.gini).map((key) => data.gini[key]) : 'none'}
              </div>
              <div className="mb-2">
                <p className="font-bold">Currencies:</p>
                {extractCurrencies()}
              </div>
            </div>
            {/* GROUP 4 */}
            <div className="m-5">
              <div className="mb-2">
                <p className="font-bold">Language(s):</p>
                {data.languages ? Object.keys(data?.languages).map((value) => <p>{value}</p>) : 'none'}
                {/* {extractLanguages()} */}
              </div>
            </div>
            {/* GROUP 5 */}
            <div className="m-5">
              <div className="mb-2">
                <p className="font-bold">Population:</p>
                <p>{data?.population} People</p>
              </div>
              <div className="mb-2">
                <p className="font-bold">Demonyms:</p>
                <p>
                  {data?.demonyms.eng.f !== data?.demonyms.eng.m
                    ? data?.demonyms.eng.f + 'and' + data?.demonyms.eng.m
                    : data?.demonyms.eng.f}
                </p>
              </div>
              <div className="mb-2">
                <p className="font-medium">Tld:</p>
                {data && data.tld.map((item) => item + '\n')}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-screen items-center w-full font-bold text-4xl">Loading...</div>
      )}
    </div>
  )
}
