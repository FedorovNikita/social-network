<template lang="pug">
  div
    .page-title.container-component
      h3 Моя стр

    CreatePost(@created="addNewPost")

    Loader(v-if="loading")
    //- p(v-else-if="!posts.length") Постов еще нет
    Post(v-else :posts="posts")
</template>

<script>
import CreatePost from '@/components/CreatePost'
import Post from '@/components/Post'

export default {
  name: 'Home',
  data: () => ({
    posts: [],
    loading: true
  }),
  async mounted() {
    this.posts = await this.$store.dispatch('fetchPosts')
    this.loading = false
  },
  components: {
    CreatePost, Post
  },
  methods: {
    addNewPost(post) {
      this.posts.unshift(post)
      console.log(this.posts)
    }
  }
}
</script>
