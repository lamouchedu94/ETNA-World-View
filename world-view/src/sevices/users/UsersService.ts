import { api } from '../ServiceHelper'

export const fetchUserData = async (name: string) => {
  return await api.get('name/' + name)
}
