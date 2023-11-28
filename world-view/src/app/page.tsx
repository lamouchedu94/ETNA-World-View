'use client'
import { useEffect, useState } from 'react'
import { fetchAllCountryData } from '@/sevices/users/UsersService'
import NavBar from '@/components/navbar'
import { countryData, Carte } from '@/components/country'

export default function Home() {
  const [inputCountry, setinputContry] = useState<string>('')
  // const [data, setData] = useState<any>()
  const [data, setData] = useState<countryData[]>([])

  useEffect(() => {
    fetchAllCountryData().then((d) => {
      setData(d)
      // setData(data)
    })
  }, [])
  function changeCurrentCountry() {
    if (inputCountry !== 'null') {
      fetchAllCountryData().then((data) => {
        setData(data)
        // setData(data)
      })
    }
  }

  function handleSetInput(input: string) {
    setinputContry(input)
  }

  console.log(data)
  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center bg-[rgb(36,35,35)]">
        <NavBar handleSetInput={handleSetInput} inputCountry={inputCountry}></NavBar>
      </div>
      <main className="flex flex-col align-middle max-w-10">
        <p>hello world</p>

        <button onClick={changeCurrentCountry}>Research</button>
      </main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {data.map((elem, i) => (
          <Carte data={elem} key={i}></Carte>
        ))}
      </div>
    </div>
  )
}
