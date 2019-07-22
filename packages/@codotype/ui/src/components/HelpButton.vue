<template>
  <span
    class="badge text-muted bg-transparent mr-2"
    @mouseover="$store.commit('editor/help/showing', true)"
    @mouseout="$store.commit('editor/help/showing', false)"
  >
    <i class="fa fa-fw fa-2x fa-question-circle" />
  </span>
</template>

<script>
export default {
  name: 'HelpButton'
}
</script>
