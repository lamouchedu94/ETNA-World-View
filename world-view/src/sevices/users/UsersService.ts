import { api } from '../ServiceHelper'

export const fetchCountryData = async (name: string) => {
  return await api.get('name/' + name).then((response) => response.data[0])
}
