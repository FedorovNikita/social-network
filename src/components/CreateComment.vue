<template lang="pug">
  form(@submit.prevent="submitHandler")
    .input-field
      textarea.materialize-textarea(
        v-model="comment" 
        id="comment" )
      label(for="comment") {{ 'send_comment' | localize }}
      
      small.helper-text.invalid(
        v-if="$v.comment.$dirty && !$v.comment.required")
        | {{ 'Message_FieldEmpty' | localize }}
      small.helper-text.invalid( 
        v-else-if="$v.comment.$dirty && !$v.comment.maxLength")
        | {{ 'Message_ToManySymbols' | localize }}
    
    div
      button.btn.waves-effect.waves-light.auth__submit(type="submit") {{ 'SendNewComment' | localize }}
        i.material-icons.right send
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['currentPost', 'uid'],
  data: () => ({
    comment: ''
  }),
  validations: {
    comment: { required, maxLength: maxLength(5000) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        if(this.$route.params.id) {
          const uid = this.$route.params.id
          if(uid) {
            const comment = await this.$store.dispatch('createComment', {
              dateComment: new Date().toJSON(),
              textComment: this.comment,
              idCurrentPost: this.currentPost,
              uid
            })

            this.comment = ''
            this.$v.$reset()
            this.$message(localizeFilter('Comment_HasBeenCreated'))

            this.$emit('createdComment', comment)
          }
        } else {
          const uid = this.uid
          if(uid) {
            const comment = await this.$store.dispatch('createComment', {
              dateComment: new Date().toJSON(),
              textComment: this.comment,
              idCurrentPost: this.currentPost,
              uid
            })

            this.comment = ''
            this.$v.$reset()
            this.$message(localizeFilter('Comment_HasBeenCreated'))

            this.$emit('createdComment', comment)
          }
        }
      } catch(e) {}
    }
  }
}
</script>
