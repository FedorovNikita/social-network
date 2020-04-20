import firebase from 'firebase/app'

export default {
  actions: {
    async fetchPosts({ commit }, param) {
      try {
        const uid = param.uid
        const posts = (await firebase.database().ref(`users/${uid}/posts`).once('value')).val() || {}
        return Object.keys(posts).map(key => ({...posts[key], id: key}))
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async createPost({ commit, dispatch }, { datePost, description, uid }) {
      try {
        const idAuthor = await dispatch('getUid')
        const post = await firebase.database().ref(`users/${uid}/posts`).push({datePost, description, idAuthor})
        return { datePost, description, id: post.key, idAuthor }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
