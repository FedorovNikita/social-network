import firebase from 'firebase/app'

export default {
  actions: {
    async fetchComments({ commit, dispatch }, { idCurrentPost }) {
      try {
        const uid = await dispatch('getUid')
        const comments = (await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments`).once('value')).val() || {}
        
        return Object.keys(comments).map(key => ({...comments[key], id: key, idCurrentPost}))
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchAttachedComments({ commit, dispatch }, { idCurrentPost, idCurrentComment }) {
      try {
        const uid = await dispatch('getUid')
        const comments = (await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments/${idCurrentComment}/attachedComments`).once('value')).val() || {}
        
        return Object.keys(comments).map(key => ({...comments[key], id: key, idCurrentPost, idCurrentComment}))
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createComment({ commit, dispatch }, { dateComment, textComment, idCurrentPost }) {
      try {
        const uid = await dispatch('getUid')
        const comment = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments`).push({dateComment, textComment, idAuthor: uid})

        return { dateComment, textComment, id: comment.key, idAuthor: uid, idCurrentPost }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createAttachedComment({ commit, dispatch }, { dateComment, textComment, idCurrentPost, idCurrentComment }) {
      try {
        const uid = await dispatch('getUid')
        const comment = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments/${idCurrentComment}/attachedComments`).push({dateComment, textComment, idAuthor: uid})

        return { dateComment, textComment, id: comment.key, idAuthor: uid, idCurrentPost, idCurrentComment }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
