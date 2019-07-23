<template>
  <b-dropdown
    no-caret
    size="sm"
    variant="light"
    class='mr-2'
    toggle-class='rounded'
  >
    <template slot="button-content">
      <i class="fa fa-fw fa-ellipsis-h" />
    </template>

    <b-dropdown-item-button @click="$store.commit('editor/modals/import/showing', true)">
      <i class="fa fa-fw fa-upload" />
      Import Project
    </b-dropdown-item-button>

    <b-dropdown-item-button @click="$store.commit('editor/modals/export/showing', true)">
      <i class="fa fa-fw fa-download" />
      Export Project
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script>
export default {
  name: 'ProjectDropdown'
}
</script>
