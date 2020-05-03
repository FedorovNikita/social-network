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
    post: [],
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
    this.posts.sort((a, b) => a.datePost > b.datePost ? 1 : -1 )

    this.loading = false
  },
  components: {
    Post
  },
}
</script>
