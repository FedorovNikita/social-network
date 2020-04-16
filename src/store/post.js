import firebase from 'firebase/app'

export default {
  actions: {
    async createPost({ commit, dispatch }, { datePost, description}) {
      try {
        const uid = await dispatch('getUid')
        const post = await firebase.database().ref(`users/${uid}/posts`).push({datePost, description})
        return { datePost, description, id: post.key }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
