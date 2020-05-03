<template lang="pug">
  div
    .page-title.container-component
      h3 {{ 'News' | localize }}
    
    Loader(v-if="loading")
    div(v-else)
      Post(v-for="post in posts.slice().reverse()" :key="post.id"  :post="post")


</template>


<script>
import firebase from 'firebase/app'
import Post from '@/components/Post'

export default {
  name: 'Home',
  data: () => ({
    posts: [],
    loading: true
  }),
  metaInfo() {
    return {
      title: this.$title('Menu_news')
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
  components: {
    Post
  },
}
</script>
