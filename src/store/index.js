/* eslint-disable */
import { createStore } from 'vuex'
import { axiosBase } from '../api/axios.js'
import router from '../router'

export default createStore({
  state: {
    access: localStorage.getItem('access') || '',
    refresh: localStorage.getItem('refresh') || '',
    isAuthenticated: localStorage.getItem("access") ? true : false,
    user: JSON.parse(localStorage.getItem("user")) || {}
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
      state.user = payload.data.user.data;
      localStorage.setItem('user', JSON.stringify(payload.data.user.data));
      state.access = payload.data.access;
      localStorage.setItem('access', payload.data.access);
      state.refresh = payload.data.refresh;
      localStorage.setItem('refresh', payload.data.refresh);
      state.isAuthenticated = true;
    },
    updateAccess(state, access) {
      state.access = access;
    },
    destroyToken (state) {
      state.access = '';
      state.refresh = '';
      state.user = {};
      state.isAuthenticated = false;
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/auth/verify-otp/', data)
          .then(response => {
            context.commit('authenticateUser', response)
            router.push('/dashboard');
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout ({ commit, state }) {
      var data = {
            'refresh': state.refresh
      }
      return new Promise((resolve, reject) => {
        axiosBase.post('/auth/logout/', data)
          .then(response => {
          })
          .catch(err => {
            resolve(err)
          }).finally(() => {
            localStorage.clear()
            commit('destroyToken')
            router.push('/')
          })
      })
    },
    refreshToken (context) {
      let refreshToken = { 'refresh': localStorage.getItem('refresh') }
      return new Promise((resolve, reject) => {
        axiosBase.post('/auth/refresh-token/', refreshToken) 
          .then(response => { 
            context.commit('updateAccess', response.data.access)
            resolve(response.data.access)
          })
          .catch(err => {
            localStorage.clear();
            router.push('/')
            commit('destroyToken')
            reject(err) 
          })
      })
    }, 
  },
  modules: {
  }
})
