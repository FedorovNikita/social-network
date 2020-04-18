<template lang="pug">
  div
    .container-component(
      v-for="post of posts.slice().reverse()"
      :key="post.id"
      :data-post="post.id")
      | {{ post.description }} {{ new Date(post.datePost) }} {{ post.idAuthor}}

      CreateComment(:currentPost="post.id" @createdComment="addNewComment")

      Loader(v-if="loading")
      //- p(v-else-if="!comments.length") На стене пока нет ни одной записи
      Comment(v-else :comments="comments")
</template>

<script>
import CreateComment from '@/components/CreateComment'
import Comment from '@/components/Comment'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    comments: [],
    loading: true,
    currentPost: ''
  }),
  components: {
    CreateComment, Comment
  },
  methods: {
    addNewComment(comment) {
      this.comments.push(comment)
      console.log(this.comments)
      
    }
  },
  async mounted() {
    // console.log(this.$refs.div.getAttribute('data-post'))
    // this.comments = await this.$store.dispatch('fetchComments')
    // console.log(this.posts)
    console.log(this.posts)
    this.loading = false
  },
}
</script>
