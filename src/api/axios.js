import axios from 'axios'
import store from '../store/index.js'
const API_BASE_URL = 'https://nems-base.quantfarm.com'

const axiosBase = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access')}`
  }
})
const getAPI = axios.create({
  baseURL: API_BASE_URL
})
getAPI.interceptors.response.use(undefined, function (err) {
  let refresh = localStorage.getItem('refresh')
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken', refresh) 
      .then(() => {
        console.log("Token Refreshed")
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
})

export { axiosBase, getAPI }