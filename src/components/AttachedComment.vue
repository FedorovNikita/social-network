<template lang="pug">
  .comment__attached.attached__border
    .comment__info
      img.comment__attached-user-img(:src="userInfo.urlImg")
      div
        router-link(:to="`/profile/${userInfo.uid}`")
          h4.comment__title {{userInfo.firstName}} {{userInfo.lastName}}
        p.comment__text {{ attachedComment.textComment }}
        span.comment__date {{ attachedComment.dateComment | date('datetime') }}

</template>

<script>
export default {
  props: ['attachedComment'],
  data: () => ({
    userInfo: ''
  }),
  async mounted() {
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.attachedComment.idAuthor
    })
  },
}
</script>
