<template>
  <b-modal
    lazy
    :visible="showingModal"
    title='Destroy Model'
    ok-title='DESTROY'
    ok-variant='danger'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="destroySchema(selectedModel)"
    @hide="showModal(false)"
  >

    <b-form>
      <p class="mb-2 form-text text-muted">Are you sure you want to destroy the {{ selectedModel.label }} model?</p>
    </b-form>

  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'SchemaDestroyModal',
  computed: mapGetters({
    showingModal: 'editor/schema/modals/destroy/showing',
    selectedModel: 'editor/schema/selectedModel'
  }),
  methods: {
    ...mapActions({
      destroySchema: 'editor/schema/destroyModel'
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/destroy/showing',
    })
  }
}
</script>
