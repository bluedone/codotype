<template>
  <span>
    <b-button
      id="schemaEditPopover"
      variant="link"
      class="py-0"
    >
      <i class="fas fa-pencil-alt"></i>
    </b-button>

    <b-popover
      :target="'schemaEditPopover'"
      placement="right"
      triggers="hover focus"
      :show="$store.getters['editor/help/showing']"
      content='Edit Model Name'>
    </b-popover>

  </span>
  <!-- @click="$store.commit('editor/schema/modals/destroy/showing', true)" -->
</template>

<script>
export default {
  name: 'SchemaEditButton'
}
</script>
