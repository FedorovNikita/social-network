<template lang="pug">
  .container-component.post
    .post__info-author
      img.post__user-img(:src="userInfo.urlImg")
      div
        h4.post__title {{userInfo.firstName}} {{userInfo.lastName}}
        span.post__date {{new Date(post.datePost) | date('datetime')}}
    p.post__description {{post.description}}
    img(:src="post.srcImg")

    <iframe v-if="videoIsOpen" width="100%" height="400" :src="`https://www.youtube.com/embed/${post.srcVideo}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    Comment(v-for="comment in comments" :key="comment.id" :comment="comment")
    
    CreateComment(:currentPost="post.id" @createdComment="addNewComment")
</template>

<script>
import CreateComment from '@/components/CreateComment'
import Comment from '@/components/Comment'

export default {
  props: ['post'],
  data: () => ({
    comments: [],
    userInfo: '',
    videoIsOpen: false
  }),
  components: {
    CreateComment, Comment
  },
  async mounted() {
    if(this.post.srcVideo) {
      this.videoIsOpen = true
    }
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.post.idAuthor
    })
    this.comments = await this.$store.dispatch('fetchComments', {
      idCurrentPost: this.post.id,
      uid: this.$route.params.id
    })
  },
  methods: {
    addNewComment(comment) {
      this.comments.push(comment)
    }
  }
}
</script>
