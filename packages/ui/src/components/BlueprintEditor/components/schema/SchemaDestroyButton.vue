<template>
  <b-button
    title='Remove Model'
    size="sm"
    variant="outline-danger"
    v-b-tooltip.hover.left
    @click="$store.commit('editor/schema/modals/destroy/showing', true)"
  >
    <i class="fa fa-fw fa-trash"></i>
  </b-button>
</template>

<script>
export default {
  name: 'SchemaDestroyButton'
}
</script>
