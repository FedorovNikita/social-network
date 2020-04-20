<template lang="pug">
  .container-component
    form(@submit.prevent="submitHandler")
      .input-field
        textarea.materialize-textarea(
          v-model="description" 
          id="description" )
        label(for="description") Что у Вас нового?
        span.character-counter( 
          style="float: right; font-size: 12px;") {{ description.length }}/{{ $v.description.$params.maxLength.max }}
        small.helper-text.invalid(
          v-if="$v.description.$dirty && !$v.description.required")
          | Поле не должно быть пустым
        small.helper-text.invalid( 
          v-else-if="$v.description.$dirty && !$v.description.maxLength")
          | Слишком много символов
      
      
      button.btn.waves-effect.waves-light.auth__submit(type="submit") Опубликовать
        i.material-icons.right send
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    description: ''
  }),
  validations: {
    description: { required, maxLength: maxLength(15895) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const uid = this.$route.params.id
        if(uid) {
          const post = await this.$store.dispatch('createPost', {
            datePost: new Date().toJSON(),
            description: this.description,
            uid
          })
          this.description = ''
          this.$v.$reset()
          this.$message('Новый пост успешно создан')
          this.$emit('created', post)
        }
      } catch(e) {}

    }
  }
}
</script>
