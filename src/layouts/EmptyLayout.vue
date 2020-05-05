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
    posts: []
  }),
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  async mounted() {
    const allUser = (await firebase.database().ref(`/users`).once('value')).val()
    const allUserArr = Object.keys(allUser).map(key => ({...allUser[key], id: key}))
    
    for(let i = 0; i < allUserArr.length; i++) {
      
      const postsArr = Object.keys(allUserArr[i].posts).map(key => ({...allUserArr[i].posts[key], id: key, uid: allUserArr[i].id}))

      for(let j = 0; j < postsArr.length; j++) {
        this.posts.push(postsArr[j])
      }
    }

    this.posts.sort((a, b) => a.datePost > b.datePost ? 1 : -1 )
    this.loading = false
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
