<template lang="pug">
  form(@submit.prevent="submitHandler")
    .input-field
      textarea.materialize-textarea(
        v-model="comment" 
        id="comment" )
      label(for="comment") Написать комментарий...
      
      small.helper-text.invalid(
        v-if="$v.comment.$dirty && !$v.comment.required")
        | Поле не должно быть пустым
      small.helper-text.invalid( 
        v-else-if="$v.comment.$dirty && !$v.comment.maxLength")
        | Слишком много символов
    
    div
      button.btn.waves-effect.waves-light.auth__submit(type="submit") Опубликовать
        i.material-icons.right send
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  props: ['currentPost'],
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
        const comment = await this.$store.dispatch('createComment', {
          dateComment: new Date().toJSON(),
          textComment: this.comment,
          idCurrentPost: this.currentPost
        })

        console.log(comment)

        this.comment = ''
        this.$v.$reset()
        this.$message('Новый комментарий успешно создан')

        this.$emit('createdComment', comment)
      } catch(e) {}
    }
  }
}
</script>
