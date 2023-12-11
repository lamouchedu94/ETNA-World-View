'use client'
import { useEffect, useState } from 'react'
import { fetchAllCountryData } from '@/sevices/users/CountryService'
import NavBar from '@/components/navbar'
import { countryData, Carte } from '@/components/country'

export default function Home() {
  const [inputCountry, setinputContry] = useState<string>('')
  // const [data, setData] = useState<any>()
  const [data, setData] = useState<countryData[]>([])
  const [dataStartWith, setDataStartWith] = useState<countryData[]>([])
  useEffect(() => {
    fetchAllCountryData().then((d) => {
      d.sort((a, b) => {
        const nameA = a.name.common.toUpperCase()
        const nameB = b.name.common.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
      setData(d)
      // setData(data)
    })
  }, [])

  function handleSetInput(input: string) {
    setinputContry(input)
  }

  useEffect(() => {
    setDataStartWith(data.filter((item) => item.name.common.toUpperCase().includes(inputCountry.toUpperCase())))
  }, [inputCountry])

  // console.log(data)
  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center bg-[rgb(36,35,35)] mb-10">
        <NavBar handleSetInput={handleSetInput} inputCountry={inputCountry}></NavBar>
      </div>
      {/* <main className="flex flex-col align-middle max-w-10">
        <button onClick={changeCurrentCountry}>Research</button>
      </main> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {inputCountry === ''
          ? data.map((elem, i) => <Carte data={elem} key={i}></Carte>)
          : dataStartWith.map((elem, i) => <Carte data={elem} key={i}></Carte>)}
      </div>
    </div>
  )
}
