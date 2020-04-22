import firebase from 'firebase/app'

export default {
  state: {
    post: {
      urlImg: '',
      urlVideo: ''
    }
  },
  mutations: {
    clearPost(state) {
      state.post = {
        urlImg: '',
        urlVideo: ''
      }
    },
    setPostSrc(state, src) {
      state.post.urlImg = src
    },
    setPostVideo(state, url) {
      state.post.urlVideo = url
    }
  },
  actions: {
    async setLike({ dispatch }, { idCurrentPost, uid }) {
      const idLiker = await dispatch('getUid')
      const like = await firebase.database().ref(`users/${uid}/posts/${idCurrentPost}/likes`).push({uid: idLiker})

      return {id: like.key, uid: idLiker, idCurrentPost }
    },
    async sendPostFile({commit, dispatch, getters}, file) {
      const uid = await dispatch('getUid')
      const ts = uid + 'date' + Date.parse(new Date())
      let storageRef = firebase.storage().ref('postImages/' + (file.name + ts));
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
        const srcVideo = await getters.post.urlVideo

        if(srcImg && srcVideo) {
          const post = await firebase.database().ref(`users/${uid}/posts`).push({datePost, description, idAuthor, srcImg: srcImg, srcVideo: srcVideo})
          return { datePost, description, id: post.key, idAuthor, srcImg: srcImg, srcVideo: srcVideo }
        } else if(srcVideo) {
          const post = await firebase.database().ref(`users/${uid}/posts`).push({datePost, description, idAuthor, srcVideo: srcVideo})
          return { datePost, description, id: post.key, idAuthor, srcVideo: srcVideo }
        } else if(srcImg) {
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
