<template lang="pug">
  div
    .container-component
      h4 автор {{post.idAuthor}}
      span Дата публикации {{post.datePost}}
      p текст поста{{post.description}}
      small id поста {{post.id}}

      CreateComment(:currentPost="post.id" @createdComment="addNewComment")
      
      Comment(v-for="comment in comments" :key="comment.id" :comment="comment")
</template>

<script>
import CreateComment from '@/components/CreateComment'
import Comment from '@/components/Comment'

export default {
  props: ['post'],
  data: () => ({
    comments: []
  }),
  components: {
    CreateComment, Comment
  },
  async mounted() {
    this.comments = await this.$store.dispatch('fetchComments', {idCurrentPost: this.post.id})
  },
  methods: {
    addNewComment(comment) {
      this.comments.push(comment)
    }
  }
}
</script>
