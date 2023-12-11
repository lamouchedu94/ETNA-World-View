import { api } from '../ServiceHelper'
import { countryData } from '@/components/country'

export const fetchCountryData = async (name: string) => {
  return await api.get('name/' + name).then((response) => response.data[0] as countryData)
}

export const fetchAllCountryData = async () => {
  return await api.get('all?fields=name,tld,independent,currencies,flags').then((response) => {
    // console.log(response.data)
    return response.data as countryData[]
  })
}