<template>
  <b-dropdown-item-button @click="onClick()">
    <i class="fa fa-fw fa-trash-alt"></i>
    Remove
  </b-dropdown-item-button>

</template>

<script>
export default {
  name: 'DestroyButton',
  props: {
    scope: {
      type: String,
      required: true
    },
    modelId: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$store.commit(`editor/schema/${this.scope}/selectedModel/id`, this.modelId)
      this.$store.commit(`editor/schema/${this.scope}/modals/destroy/showing`, true)
    }
  }
}
</script>
