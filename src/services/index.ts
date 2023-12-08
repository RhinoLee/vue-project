import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
const $axios = axios.create({
  baseURL: BASE_URL
})

export default $axios