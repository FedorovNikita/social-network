import firebase from 'firebase/app'

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(e) {
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
          dateBirth
        })
      } catch(e) {
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
