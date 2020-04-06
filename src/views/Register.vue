<template lang="pug">
  form.auth
    .auth__content
      h2.auth__title Впервые у нас?
      .input-field
        input#email(
          type="text")
        label(for="email") Email
      .input-field
        input#password(
          type="password")
        label(for="password") Пароль
      .input-field
        input#confirmPassword(
          type="password")
        label(for="confirmPassword") Повторите пароль
      .input-field
        input#firstName(
          type="text")
        label(for="firstName") Имя
      .input-field
        input#lastName(
          type="text")
        label(for="lastName") Фамилия
      .input-field
        input#dateBirth(
          type="date"
          min="1902-01-01" 
          max="2006-12-12") 
        label(for="dateBirth") Дата рождения
        small.helper-text.invalid Введите дату рождения

      p
        label
          input(type="checkbox")
          span С правилами согласен
    .auth__action
      div
        button.btn.waves-effect.waves-light.auth__submit(type="submit") Зарегистрироваться
          i.material-icons.right send

      p.center Уже есть аккаунт?
        router-link(to="/login") Войти!
</template>

