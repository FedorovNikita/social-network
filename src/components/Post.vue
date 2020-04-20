<template lang="pug">
  .container-component.post
    h4.post__title Никита Федоров 
      //- | {{post.idAuthor}}
    span.post__date 20 марта 2020 
      //- | {{post.datePost}}
    p.post__description {{post.description}}
    //- small id поста {{post.id}}

    //- hr

    Comment(v-for="comment in comments" :key="comment.id" :comment="comment")
    
    CreateComment(:currentPost="post.id" @createdComment="addNewComment")
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
    // console.log(this.comments)
  },
  methods: {
    addNewComment(comment) {
      this.comments.push(comment)
    }
  }
}
</script>
