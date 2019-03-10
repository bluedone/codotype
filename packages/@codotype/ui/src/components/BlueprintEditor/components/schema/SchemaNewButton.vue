<template>
  <b-button
    id="new-model-button"
    block
    variant="primary"
    size="lg"
    class="mb-3"
    @click="$store.dispatch('editor/schema/newModel')"
  >
    <i class="fa fa-fw fa-plus"></i>
    New Schema
  </b-button>
</template>

<script>
export default {
  name: 'SchemaNewButton'
}
</script>
