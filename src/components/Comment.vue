<template lang="pug">
  div
    Loader(v-if="loading" style="height: 50px")
    .comment(v-else)
      .comment__info
        img.comment__user-img(:src="userInfo.urlImg")
        div
          h4.comment__title {{userInfo.firstName}} {{userInfo.lastName}}
          p.comment__text {{ comment.textComment }}
          span.comment__date {{ comment.dateComment | date('datetime') }}
          
          div.likes
            span.likes__thumb-up(@click="changeCommentLikes" v-if="likeIsOpen") 
              i.material-icons thumb_up
            span.likes__count
              i.material-icons(:class="{likes__favorite: !likeIsOpen}") favorite
              | {{ countLike }} 

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
    userInfo: [],
    loading: true,
    likeIsOpen: true,
    countLike: ''
  }),
  components: {
    CreateAttachedComment, AttachedComment
  },
  async mounted() {
    if(this.comment.likes) {
      const uid = await this.$store.dispatch('getUid')
      if(uid) {
        const likesId = Object.keys(this.comment.likes).map(key => ({...this.comment.likes[key], id: key}))
        for(let i = 0; i < likesId.length; i++) {
          if(likesId[i].uid == uid) {
            this.likeIsOpen = false
          }
        }
        this.countLike = likesId.length
      }
    }
    this.userInfo = await this.$store.dispatch('fetchUser', {
      idUser: this.comment.idAuthor
    })
    this.attachedComments = await this.$store.dispatch('fetchAttachedComments', {  
      idCurrentPost: this.comment.idCurrentPost, 
      idCurrentComment: this.comment.id,
      uid: this.$route.params.id,
    })
    this.loading = false
  },
  methods: {
    addNewAttachedComment(comment) {
      this.attachedComments.push(comment)
    },
    async changeCommentLikes() {
      const like = await this.$store.dispatch('setCommentLike', {
        idCurrentPost: this.comment.idCurrentPost,
        idCurrentComment: this.comment.id,
        uid: this.$route.params.id,
      })
      this.countLike += 1
      this.likeIsOpen = false
    }
  }
}
</script>
