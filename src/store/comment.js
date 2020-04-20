import firebase from 'firebase/app'

export default {
  actions: {
    async fetchComments({ commit }, { idCurrentPost, uid }) {
      try {
        const comments = (await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments`).once('value')).val() || {}
        
        return Object.keys(comments).map(key => ({...comments[key], id: key, idCurrentPost}))
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchAttachedComments({ commit }, { idCurrentPost, idCurrentComment, uid }) {
      try {
        const comments = (await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments/${idCurrentComment}/attachedComments`).once('value')).val() || {}
        
        return Object.keys(comments).map(key => ({...comments[key], id: key, idCurrentPost, idCurrentComment}))
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createComment({ commit, dispatch }, { dateComment, textComment, idCurrentPost, uid }) {
      try {
        const idAuthor = await dispatch('getUid')
        const comment = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments`).push({dateComment, textComment, idAuthor})

        return { dateComment, textComment, id: comment.key, idAuthor, idCurrentPost }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createAttachedComment({ commit, dispatch }, { dateComment, textComment, idCurrentPost, idCurrentComment, uid }) {
      try {
        const idAuthor = await dispatch('getUid')
        const comment = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments/${idCurrentComment}/attachedComments`).push({dateComment, textComment, idAuthor})

        return { dateComment, textComment, id: comment.key, idAuthor, idCurrentPost, idCurrentComment }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
