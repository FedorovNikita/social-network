<template lang="pug">
  form.auth
    .auth__content
      h2.auth__title Войти 
      .input-field
        input#email(type="text")
        label(for="email") Email
      .input-field
        input#password(type="password")
        label(for="password") Пароль
    .auth__action
      div
        button.btn.waves-effect.waves-light.auth__submit(type="submit") Войти
          i.material-icons.right send

      p.center Нет аккаунта?
        router-link(to="/register") Зарегистрироваться
      
</template>

<script>

export default {
  name: 'login',

}
</script>
