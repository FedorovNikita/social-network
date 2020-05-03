<template lang="pug">
  .bg-empty
    .container.empty-layout
      .posts
        Post(v-for="p in posts.slice().reverse()" :key="p.id"  :post="p")
      router-view
</template>

<script>
import firebase from 'firebase/app'
import messages from '@/utils/messages'
import Post from '@/components/Post'

export default {
  data: () => ({
    post: [],
    posts: []
  }),
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  async mounted() {
    const allUser = (await firebase.database().ref(`/users`).once('value')).val()
    const allUserId = Object.keys(allUser)
    for(let i = 0; i < allUserId.length; i++) {
      const postsUser = (await firebase.database().ref(`/users/${allUserId[i]}/posts`).once('value')).val()
      if(postsUser) {
        const userPostsArr = Object.keys(postsUser).map(key => ({...postsUser[key], id: key, uid: allUserId[i]}))
        this.post.push(userPostsArr)
      }
    }
    
    let testArr = []
    for(let i = 0; i < this.post.length; i++) {
      for(let j = 0; j < this.post[i].length; j++) {
        testArr.push(this.post[i][j])
      }
    }
    this.posts = testArr
    let sortArr = this.posts.sort((a, b) => a.datePost > b.datePost ? 1 : -1 )

  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  components: {
    Post
  },
}
</script>

<style scoped>
  .bg-empty {
    background-image: url('../assets/img/bg-empty.svg');
    background-repeat: no-repeat;
  }
</style>
