<template lang="pug">
  div
    h4 Автор коммента {{ comment.idAuthor}}
    p Тект коммента {{ comment.textComment }}
    span Дата публикации {{ comment.dateComment }}
    small id коммента {{ comment.id }} {{comment.idCurrentPost}}

    CreateAttachedComment(:idCurrentComment="comment.id" :idCurrentPost="comment.idCurrentPost" @createdAttachedComment="addNewAttachedComment")
    AttachedComment(v-for="attachedComment in attachedComments" :key="attachedComment.id" :attachedComment="attachedComment")
</template>

<script>
import CreateAttachedComment from '@/components/CreateAttachedComment'
import AttachedComment from '@/components/AttachedComment'

export default {
  props: ['comment'],
  data: () => ({
    attachedComments: []
  }),
  components: {
    CreateAttachedComment, AttachedComment
  },
  async mounted() {
    this.attachedComments = await this.$store.dispatch('fetchAttachedComments', { idCurrentPost: this.comment.idCurrentPost, idCurrentComment: this.comment.id })
  },
  methods: {
    addNewAttachedComment(comment) {
      this.attachedComments.push(comment)
    }
  }
}
</script>
