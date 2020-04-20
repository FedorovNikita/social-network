import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateDate = {...getters.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateDate)
        commit('setInfo', updateDate)
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        info.uid = uid
        commit('setInfo', info)
        return uid
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchUser({}, {idUser}) {
      const user = (await firebase.database().ref(`/users/${idUser}/info`).once('value')).val()
      return user
    }
  },
  getters: {
    info: s => s.info
  }
}
