'use client'
import { useState } from 'react'
import { fetchCountryData } from '@/sevices/users/UsersService'
import Carte from '@/components/country'
import NavBar from '@/components/navbar'

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
  tld: {}
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
          tld: data.tld,
          independent: data.independent,
          currencies: data.currencies,
          flags: data.flags
        })
        // setData(data)
      })
    }
  }

  function handleSetInput(input: string) {
    setinputContry(input)
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center bg-[rgb(36,35,35)]">
        <NavBar handleSetInput={handleSetInput} inputCountry={inputCountry}></NavBar>
      </div>
      <main className="flex flex-col align-middle max-w-10">
        <p>hello world</p>

        <button onClick={changeCurrentCountry}>Research</button>
        <div>
          {data && <p>{data.name.common}</p>}
          {data && <img src={data.flags.svg} alt="flag" width={600}></img>}
        </div>
        {/* {data && <p>{data.cca2}</p>} */}
      </main>
      <Carte></Carte>
    </div>
  )
}
