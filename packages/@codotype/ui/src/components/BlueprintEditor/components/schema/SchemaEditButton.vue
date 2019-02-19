<template>
  <b-button
    id="schemaEditPopover"
    variant="link"
    class="py-0"
    @click="$store.dispatch('editor/schema/editModel')"
  >
    <i class="fas fa-pencil-alt"></i>
  </b-button>
</template>

<script>
export default {
  name: 'SchemaEditButton'
}
</script>
