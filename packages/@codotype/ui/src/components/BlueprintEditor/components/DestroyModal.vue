<template>
  <b-modal
    lazy
    :visible="$store.getters[`editor/schema/${scope}/modals/destroy/showing`]"
    :title='`Destroy ${label}?`'
    ok-title='DESTROY'
    ok-variant='danger'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="$store.dispatch(`editor/schema/${scope}/destroyModel`, selectedModel.id)"
    @hide="$store.commit(`editor/schema/${scope}/modals/destroy/showing`, false)"
  >

    <b-form>
      <p class="mb-2 form-text text-muted">Are you sure you want to destroy this {{ label }}?</p>
    </b-form>

  </b-modal>
</template>

<script>
export default {
  name: 'DestroyModal',
  props: {
    scope: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    selectedModel () {
      const modelGetter = this.$store.getters[`editor/schema/${this.scope}/collection/byId`]
      return modelGetter(this.$store.getters[`editor/schema/${this.scope}/selectedModel/id`])
    }
  }
}
</script>
