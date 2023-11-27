'use client'
import { useState } from 'react'
import { fetchCountryData } from '@/sevices/users/UsersService'

type countryData = {
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  independent: boolean
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  flags: {
    png: string
    svg: string
  }
}

export default function Home() {
  const [inputCountry, setinputContry] = useState<string>('')
  // const [data, setData] = useState<any>()
  const [data, setData] = useState<countryData>()
  function changeCurrentCountry() {
    if (inputCountry !== 'null') {
      fetchCountryData(inputCountry).then((data) => {
        setData({
          name: { common: data.name.common, official: data.name.official, nativeName: data.name.nativeName },
          independent: data.independent,
          currencies: data.currencies,
          flags: data.flags
        })
        // setData(data)
      })
    }
  }

  return (
    <div className="flex justify-center ">
      <main className="flex flex-col align-middle max-w-10">
        <p>hello world</p>
        <input
          type="text"
          className="bg-[rgb(229,229,229)]"
          value={inputCountry}
          onChange={(v) => setinputContry(v.currentTarget.value)}
        />
        <button onClick={changeCurrentCountry}>Research</button>
        <div>
          {data && <p>{data.name.common}</p>}
          {data && <img src={data.flags.svg} alt="flag" width={600}></img>}
        </div>
        {/* {data && <p>{data.cca2}</p>} */}
      </main>
    </div>
  )
}
