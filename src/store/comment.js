import firebase from 'firebase/app'

export default {
  actions: {
    async setCommentLike({ dispatch }, { idCurrentPost, idCurrentComment, uid }) {
      const idLiker = await dispatch('getUid')
      const like = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/comments/${idCurrentComment}/likes`).push({uid: idLiker})

      return {id: like.key, uid: idLiker, idCurrentPost, idCurrentComment }
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
