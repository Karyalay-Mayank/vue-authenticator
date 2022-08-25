import axios from 'axios'
import store from '../store/index.js'
const API_BASE_URL = 'https://nems-base.quantfarm.com'

const axiosBase = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('access')}`
  }
})
const getAPI = axios.create({
  baseURL: API_BASE_URL
})
getAPI.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken') 
      .then(access => {
        axios.request({
          baseURL: API_BASE_URL,
          method: 'get',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${access}`
          },
          url: '/mods/'
        }).then(response => {
          console.log('Success getting the Mods')
          store.state.APIData = response.data
        }).catch(err => {
          console.log('Got the new access token but error while trying to fetch data from the API using it')
          return Promise.reject(err)
        })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
})

export { axiosBase, getAPI }