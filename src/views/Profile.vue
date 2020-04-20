<template lang="pug">
  div
    .page-title.container-component
      h3 Profile

    CreatePost(@created="addNewPost")

    Loader(v-if="loading")
    p(v-else-if="!posts.length") На стене пока нет ни одной записи
    div(v-else)
      Post(v-for="post in posts.slice().reverse()" :key="post.id"  :post="post")
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
    this.posts = await this.$store.dispatch('fetchPosts', {
      uid: this.$route.params.id
    })

    this.loading = false
  },
  components: {
    CreatePost, Post
  },
  methods: {
    addNewPost(post) {
      this.posts.push(post)
    }
  }
}
</script>
