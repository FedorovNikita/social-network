import firebase from 'firebase/app'

export default {
  actions: {
    async createComment({ commit, dispatch }, { dateComment, textComment, idCurrentPost }) {
      try {
        const uid = await dispatch('getUid')
        const post = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments`).push({dateComment, textComment, idAuthor: uid})
        return { dateComment, textComment, id: post.key, idAuthor: uid }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
