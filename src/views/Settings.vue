<template lang="pug">
  .container-component
    h3.page-title Редактировать 

    form.form(@submit.prevent="submitHandler")
      .input-field
        input#userName(
          type="text" 
          v-model="firstName"
          :class="{ invalid: $v.firstName.$dirty && !$v.firstName.required }")
        label(for="userName") Имя
        small.helper-text.invalid(
          v-if="$v.firstName.$dirty && !$v.firstName.required")
          | Поле Имя не может быть пустым

      .input-field
        input#userName(
          type="text" 
          v-model="lastName"
          :class="{ invalid: $v.lastName.$dirty && !$v.lastName.required }")
        label(for="userName") Фамилия
        small.helper-text.invalid(
          v-if="$v.lastName.$dirty && !$v.lastName.required")
          | Поле Фамилия не может быть пустым

      .input-field
        input#dateBirth(
          type="date"
          min="1902-01-01" 
          max="2006-12-12"
          v-model="dateBirth"
          :class="{ invalid: $v.dateBirth.$dirty && !$v.dateBirth.required }") 
        label(for="dateBirth") Дата рождения
        small.helper-text.invalid( 
          v-if="$v.dateBirth.$dirty && !$v.dateBirth.required")
          | Поле Дата рождения не должно быть пустым

      button.btn.waves-effect.waves-light(type="submit") Обновить
        i.material-icons.right near_me
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'settings',
  data: () => ({
    firstName: '',
    lastName: '',
    dateBirth: ''
  }),
  validations: {
    firstName: { required },
    lastName: { required },
    dateBirth: { required }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('updateInfo', {
          firstName: this.firstName,
          lastName: this.lastName,
          dateBirth: this.dateBirth
        })
      } catch(e) {}
    }

  },
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.firstName = this.info.firstName
    this.lastName = this.info.lastName
    this.dateBirth = this.info.dateBirth
    setTimeout(() => {
      M.updateTextFields()
    }, 0);
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
