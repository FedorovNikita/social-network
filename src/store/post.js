import firebase from 'firebase/app'

export default {
  state: {
    post: {
      urlImg: ''
    }
  },
  mutations: {
    clearPost(state) {
      state.post = {
        urlImg: ''
      }
    },
    setPostSrc(state, src) {
      state.post.urlImg = src
    }
  },
  actions: {
    sendPostFile({commit, dispatch, getters}, file) {
      let storageRef = firebase.storage().ref('postImages/' + file.name);
      let uploadTask = storageRef.put(file);

      uploadTask.on('state_changed', 
        function(snapshot){}, 
        function(error) {}, 
        async function() {
          await uploadTask.snapshot.ref.getDownloadURL()
            .then( async (downloadURL) => {
              await commit('setPostSrc', downloadURL)
            });
      });
    },
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
    async createPost({ commit, dispatch, getters }, { datePost, description, uid }) {
      try {
        const idAuthor = await dispatch('getUid')
        const srcImg = await getters.post.urlImg
        if(srcImg) {
          const post = await firebase.database().ref(`users/${uid}/posts`).push({datePost, description, idAuthor, srcImg: srcImg})
          return { datePost, description, id: post.key, idAuthor, srcImg: srcImg }
        } else {
          const post = await firebase.database().ref(`users/${uid}/posts`).push({datePost, description, idAuthor})
          return { datePost, description, id: post.key, idAuthor }
        }
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    post: s => s.post
  }
}
