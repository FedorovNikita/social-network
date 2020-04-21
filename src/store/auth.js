import firebase from 'firebase/app'

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        return uid
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async register({ dispatch, commit }, { email, password, firstName, lastName, dateBirth }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          firstName,
          lastName,
          dateBirth,
          urlImg: 'https://firebasestorage.googleapis.com/v0/b/social-network-cafed.appspot.com/o/userDefault.png?alt=media&token=cc96c6a4-e657-402e-b613-fa6eaebb2f8b'
        })
        return uid
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
