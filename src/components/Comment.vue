<template lang="pug">
  .comment
    h4.comment__title {{userInfo.firstName}} {{userInfo.lastName}}
    p.comment__text {{ comment.textComment }}
    span.comment__date {{ comment.dateComment | date('datetime') }}

    CreateAttachedComment(:idCurrentComment="comment.id" :idCurrentPost="comment.idCurrentPost" @createdAttachedComment="addNewAttachedComment")
    AttachedComment(v-for="attachedComment in attachedComments" :key="attachedComment.id" :attachedComment="attachedComment")
</template>

<script>
import CreateAttachedComment from '@/components/CreateAttachedComment'
import AttachedComment from '@/components/AttachedComment'

export default {
  props: ['comment'],
  data: () => ({
    attachedComments: [],
    userInfo: ''
  }),
  components: {
    CreateAttachedComment, AttachedComment
  },
  async mounted() {
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.comment.idAuthor
    })
    this.attachedComments = await this.$store.dispatch('fetchAttachedComments', {  
      idCurrentPost: this.comment.idCurrentPost, 
      idCurrentComment: this.comment.id,
      uid: this.$route.params.id
    })
  },
  methods: {
    addNewAttachedComment(comment) {
      this.attachedComments.push(comment)
    }
  }
}
</script>
