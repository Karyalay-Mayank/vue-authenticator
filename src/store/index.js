/* eslint-disable */
import { createStore } from 'vuex'
import { axiosBase } from '../api/axios.js'

export default createStore({
  state: {
    access: '',
    refresh: '',
    isAuthenticated: localStorage.getItem("access") ? true : false,
    user: {}
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    user: (state) => {
        return state.user;
    },
  },
  mutations: {
    authenticateUser(state, payload) {
      state.user = payload;
      localStorage.setItem('user', payload.user.data);
      state.access = payload;
      localStorage.setItem('access', payload.access);
      state.refresh = payload;
      localStorage.setItem('refresh', payload.refresh);
    },
    updateAccess(state, access) {
      state.access = access;
    },
    destroyToken (state) {
      state.access = null;
      state.refresh = null;
    }
  },
  actions: {
    // login({commit}, user) {
    //   commit('authenticateUser', user)
    //   console.log(user)
    // }
    login (context, data) {
      return new Promise((resolve, reject) => {
        // send the username and password to the backend API:
        axiosBase.post('/auth/verify-otp/', data)
        // if successful update local storage:
          .then(response => {
            context.commit('authenticateUser', response) // store the access and refresh token in localstorage
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout (context, data) {
      if (context.getters.isAuthenticated) {
        return new Promise((resolve, reject) => {
          axiosBase.post('/auth/logout/')
            .then(response => {
              localStorage.removeItem('access')
              localStorage.removeItem('refresh')
              context.commit('destroyToken')
            })
            .catch(err => {
              localStorage.removeItem('access')
              localStorage.removeItem('refresh')
              context.commit('destroyToken')
              resolve(err)
            })
        })
      }
    },
    refreshToken (context) {
      let refreshToken = { 'refresh': sessionStorage.getItem('refresh') }
      return new Promise((resolve, reject) => {
        axiosBase.post('/auth/refresh-token/', refreshToken) // send the stored refresh token to the backend API
          .then(response => { // if API sends back new access and refresh token update the store
            console.log('New access token generated')
            context.commit('updateAccess', response.data.access)
            resolve(response.data.access)
          })
          .catch(err => {
            console.log('error in refreshToken Task')
            localStorage.clear();
            reject(err) // error generating new access and refresh token because refresh token has expired
          })
      })
    }, 
  },
  modules: {
  }
})
