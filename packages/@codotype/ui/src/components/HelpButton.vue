<template>
  <b-button
    variant="light"
    class="mr-2"
    @mouseover="$store.commit('editor/help/showing', true)"
    @mouseout="$store.commit('editor/help/showing', false)"
  >
    <!-- <i class="fa fa-fw fa-question-circle" /> -->
    <i class="fas fa-fw fa-book-open" />
    Tutorial
  </b-button>
</template>

<script>
export default {
  name: 'HelpButton'
}
</script>
