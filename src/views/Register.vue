<template lang="pug">
  form.auth.container-component(@submit.prevent="submitHandler")
    .auth__content
      h2.auth__title Впервые у нас?
      .input-field
        input#email(
          type="text"
          v-model.trim="email"
          :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }")
        label(for="email") Email
        small.helper-text.invalid(
          v-if="$v.email.$dirty && !$v.email.required")
          | Поле Email не должно быть пустым
        small.helper-text.invalid(
          v-else-if="$v.email.$dirty && !$v.email.email")
          | Введите корректный Email
      .input-field
        input#password(
          type="password"
          v-model.trim="password"
          :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }")
        label(for="password") Пароль
        small.helper-text.invalid(
          v-if="$v.password.$dirty && !$v.password.required")
          | Введите пароль
        small.helper-text.invalid( 
          v-else-if="$v.password.$dirty && !$v.password.minLength")
          | Пароль должен быть {{$v.password.$params.minLength.min }} символов. Сейчас он {{ password.length }}
      .input-field
        input#confirmPassword(
          type="password"
          v-model.trim="confirmPassword"
          :class="{ invalid: ($v.confirmPassword.$dirty && !$v.confirmPassword.required) || ($v.confirmPassword.$dirty && !$v.confirmPassword.sameAs) }")
        label(for="confirmPassword") Повторите пароль
        small.helper-text.invalid( 
          v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required")
          | Повторите пароль
        small.helper-text.invalid( 
          v-else-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAs")
          | Пароль должен совпадать
      .input-field
        input#firstName(
          type="text"
          v-model.trim="firstName"
          :class="{ invalid: ($v.firstName.$dirty && !$v.firstName.required) || ($v.firstName.$dirty && !$v.firstName.maxLength) }")
        label(for="firstName") Имя
        small.helper-text.invalid( 
          v-if="$v.firstName.$dirty && !$v.firstName.required")
          | Введите имя
        small.helper-text.invalid( 
          v-else-if="$v.firstName.$dirty && !$v.firstName.maxLength")
          | Недопустимое количество символов. Символов не должно быть больше {{ $v.firstName.$params.maxLength.max }}
      .input-field
        input#lastName(
          type="text"
          v-model.trim="lastName"
          :class="{ invalid: ($v.lastName.$dirty && !$v.lastName.required) || ($v.lastName.$dirty && !$v.lastName.maxLength) }")
        label(for="lastName") Фамилия
        small.helper-text.invalid(
          v-if="$v.lastName.$dirty && !$v.lastName.required")
          | Введите фамилию
        small.helper-text.invalid( 
          v-else-if="$v.lastName.$dirty && !$v.lastName.maxLength")
          | Недопустимое количество символов. Символов не должно быть больше {{ $v.lastName.$params.maxLength.max }}
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
          | Введите дату рождения

      p
        label
          input(
            type="checkbox"
            v-model="agree")
          span С правилами согласен
    .auth__action
      div
        button.btn.waves-effect.waves-light.auth__submit(type="submit") Зарегистрироваться
          i.material-icons.right send

      p.center Уже есть аккаунт? 
        router-link(to="/login") Войти!
</template>

<script>
import { email, required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agree: false,
    dateBirth: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, sameAs: sameAs('password') },
    firstName: { required, maxLength: maxLength(50) },
    lastName: { required, maxLength: maxLength(50) },
    agree: { checked: v => v },
    dateBirth: { required }
  },
  methods: {
    async submitHandler() { 
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        dateBirth: this.dateBirth
      }

      try {
        console.log(formData)
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(e) {}
      
    }
  },
}
</script>
