<template lang="pug">
  div
    .container-component(
      v-for="post of posts.slice().reverse()"
      :key="post.id"
      :data-post="post.id")
      | {{ post.description }} {{ new Date(post.datePost) }} {{ post.idAuthor}}

      CreateComment(:currentPost="post.id" @createdComment="addNewComment")

      Comment(:comments="post.comments" :newComment="comments")
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
    comments: '' || {},
    currentPost: ''
  }),
  components: {
    CreateComment, Comment
  },
  methods: {
    addNewComment(comment) {
      this.comments = comment
    }
  }
}
</script>
