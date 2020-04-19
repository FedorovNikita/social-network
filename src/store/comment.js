import firebase from 'firebase/app'

export default {
  actions: {
    async fetchComments({ commit, dispatch }, { idCurrentPost }) {
      try {
        const uid = await dispatch('getUid')
        const comments = (await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments`).once('value')).val() || {}
        
        return Object.keys(comments).map(key => ({...comments[key], id: key}))
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createComment({ commit, dispatch }, { dateComment, textComment, idCurrentPost }) {
      try {
        const uid = await dispatch('getUid')
        const comment = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments`).push({dateComment, textComment, idAuthor: uid})
        return { dateComment, textComment, id: comment.key, idAuthor: uid }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
