<template lang="pug">
  div
    h3.page-title Редактировать 

    form.form
      .input-field
        input#userName(type="text")
        label(for="userName") Имя
        span.helper-text.invalid name

      button.btn.waves-effect.waves-light(type="submit") Обновить
        i.material-icons.right send
</template>

<script>

export default {
  name: 'settings',
}
</script>
