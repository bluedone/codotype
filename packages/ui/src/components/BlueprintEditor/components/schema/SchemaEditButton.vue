<template>
  <b-button
    title='Edit Model Name'
    variant="link"
    class="py-0"
    v-b-tooltip.hover.right
  >
    <i class="fas fa-pencil-alt"></i>
  </b-button>
  <!-- @click="$store.commit('editor/schema/modals/destroy/showing', true)" -->
</template>

<script>
export default {
  name: 'SchemaEditButton'
}
</script>
