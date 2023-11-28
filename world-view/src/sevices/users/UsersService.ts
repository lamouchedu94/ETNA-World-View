import { api } from '../ServiceHelper'

export const fetchCountryData = async (name: string) => {
  return await api.get('name/' + name).then((response) => response.data[0])
}

export const fetchAllCountryData = async () => {
  return await api.get('all/').then((response) => response)
}
