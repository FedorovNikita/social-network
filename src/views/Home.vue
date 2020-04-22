<template lang="pug">
  div
    .page-title.container-component
      h3 Моя лента
    div(v-for="post in posts")
      PostNews(v-for="p in post.slice().reverse()" :key="p.id"  :post="p")

</template>


<script>
import firebase from 'firebase/app'
import PostNews from '@/components/news/PostNews'

export default {
  data: () => ({
    posts: []
  }),
  async mounted() {
    const allUser = (await firebase.database().ref(`/users`).once('value')).val()
    const allUserId = Object.keys(allUser)
    for(let i = 0; i < allUserId.length; i++) {
      const postsUser = (await firebase.database().ref(`/users/${allUserId[i]}/posts`).once('value')).val()
      if(postsUser) {
        const userPostsArr = Object.keys(postsUser).map(key => ({...postsUser[key], id: key, uid: allUserId[i]}))
        this.posts.push(userPostsArr)
      }
    }
    // console.log(this.posts)
  },
  components: {
    PostNews
  },
}
</script>
