'use client'
import { useEffect, useState } from 'react'
import { fetchUserData } from '@/sevices/users/UsersService'

export default function Home() {
  const [data, setData] = useState<any>()
  useEffect(() => {
    fetchUserData('France').then((response) => {
      setData(response.data)
    })
  })

  return (
    <div>
      <p>hello world</p>
      {data && <p>{data[0].name.common}</p>}
    </div>
  )
}
