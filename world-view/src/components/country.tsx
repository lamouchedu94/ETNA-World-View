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
    <div>
      {data && <p>{data.name.common}</p>}
      {data && <img src={data.flags.svg} alt="flag" width={600}></img>}
    </div>
  )
}
