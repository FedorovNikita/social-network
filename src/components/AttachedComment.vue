<template lang="pug">
  .comment__attached.attached__border
    h4.comment__title Иван Иванов 
      //- | {{ attachedComment.idAuthor}}
    p.comment__text {{ attachedComment.textComment }}
    span.comment__date {{ attachedComment.dateComment | date('datetime') }}
    //- small id коммента {{ attachedComment.id }} {{attachedComment.idCurrentPost}} {{attachedComment.idCurrentComment}}
</template>

<script>
export default {
  props: ['attachedComment']
}
</script>
