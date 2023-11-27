'use client'
import { useEffect, useState } from 'react'
import { fetchUserData } from '@/sevices/users/UsersService'

export default function Home() {
  const [inputCountry, setinputContry] = useState<string>('')
  const [data, setData] = useState<any>()

  function changeCurrentCountry() {
    if (inputCountry !== 'null') {
      fetchUserData(inputCountry).then((response) => {
        setData(response.data)
      })
    }
  }

  return (
    <body className="flex justify-center">
      <main className="flex flex-col align-middle">
        <p>hello world</p>
        <input
          type="text"
          className="bg-[rgb(229,229,229)]"
          value={inputCountry}
          onChange={(v) => setinputContry(v.currentTarget.value)}
        />
        <button onClick={changeCurrentCountry}>Research</button>
        {data && <p>{data[0].name.common}</p>}
      </main>
    </body>
  )
}
