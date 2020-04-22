<template lang="pug">
  .bg-empty
    .container.empty-layout
      .posts
        //- ul.posts__list
        //-   li.posts__item
        //-     //- img.posts__image(src="@/assets/img/mn.jpg" alt="")
        //-     h3.posts__title Title
        //-     p.posts__text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa, dolores laboriosam soluta repellendus numquam molestiae dicta possimus fugit rerum?
        //-   li.posts__item
        //-     //- img.posts__image(src="@/assets/img/mn.jpg" alt="")
        //-     h3.posts__title Title
        //-     p.posts__text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa, dolores laboriosam soluta repellendus numquam molestiae dicta possimus fugit rerum?
        div(v-for="post in posts")
          PostNews(v-for="p in post.slice().reverse()" :key="p.id"  :post="p")
      router-view
</template>

<script>
import firebase from 'firebase/app'
import messages from '@/utils/messages'
import PostNews from '@/components/news/PostNews'

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
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  components: {
    PostNews
  },
}
</script>

<style scoped>
  .bg-empty {
    background-image: url('../assets/img/bg-empty.svg');
    background-repeat: no-repeat;
  }
</style>
