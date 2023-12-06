import Link from 'next/link'

export type countryData = {
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
  ccn3: string
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

interface CarteProps {
  data: countryData | null
}

export function Carte({ data }: CarteProps) {
  return (
    <Link
      className="flex flex-col justify-center items-center border-2 rounded-lg p-3 mb-10"
      href={`/detail?name=${data?.name.common}`}
    >
      {data && <p>{data.name.common}</p>}
      {data && <img src={data.flags.svg} alt="flag" width={400}></img>}
    </Link>
  )
}
