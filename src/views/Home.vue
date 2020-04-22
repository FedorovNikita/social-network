<template lang="pug">
  div
    .page-title.container-component
      h3 Моя лента
    
    PostNews(v-for="p in posts.slice().reverse()" :key="p.id"  :post="p")

</template>


<script>
import firebase from 'firebase/app'
import PostNews from '@/components/news/PostNews'
import Post from '@/components/Post'

export default {
  data: () => ({
    post: [],
    posts: []
  }),
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
  components: {
    PostNews
  },
}
</script>
