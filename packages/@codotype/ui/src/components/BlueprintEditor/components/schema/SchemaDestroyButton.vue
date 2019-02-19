<template>
  <b-button
    id="schema-destroy-button"
    size="sm"
    variant="outline-danger"
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
