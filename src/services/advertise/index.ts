import $axios from '@/services'

export interface AdvertiseObj {
  id?: number
  title: string
  status: number | null
  url: string
  image: string
}

export const getAdListAPI = () => {
  return $axios.get('/advertises')
}

export const createAdAPI = (data: AdvertiseObj) => {
  return $axios.post('/advertises', data)
}

export const editAdAPI = (data: AdvertiseObj) => {
  const { title, status, url, image } = data
  const params = { title, status, url, image }

  return $axios.put(`/advertises/${data.id}`, params)
}

export const filterAdAPI = (title: string) => {
  return $axios.get(`/advertises?title=${title}`)
}
