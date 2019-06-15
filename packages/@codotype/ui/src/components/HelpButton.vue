<template>
  <span
    class="text-muted"
    @mouseover="$store.commit('editor/help/showing', true)"
    @mouseout="$store.commit('editor/help/showing', false)"
  >
    <i class="fa fa-lg fa-question-circle"></i>
    Help
  </span>
</template>

<script>
export default {
  name: 'HelpButton'
}
</script>
