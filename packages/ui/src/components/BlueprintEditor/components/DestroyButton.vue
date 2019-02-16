<template>
  <b-button
    size="sm"
    variant="outline-danger"
    v-b-tooltip.hover.top
    title="Remove"
    @click="onClick()"
  >
    <i class="fa fa-fw fa-trash"></i>
  </b-button>
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
