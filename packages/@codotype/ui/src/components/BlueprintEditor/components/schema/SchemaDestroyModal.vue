<template>
  <b-modal
    lazy
    :visible="showingModal"
    title='Remove Schema'
    ok-title='REMOVE'
    ok-variant='danger'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="destroyModel(selectedModel)"
    @hide="showModal(false)"
  >

    <b-row>
      <b-col sm=12 class='d-flex align-items-center flex-column'>
        <p class="mb-2 form-text text-muted">Are you sure you want to remove the {{ selectedModel.label }} Schema?</p>
        <small><strong>This action cannot be undone.</strong></small>
      </b-col>
    </b-row>

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
      destroyModel: 'editor/schema/destroyModel'
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/destroy/showing',
    })
  }
}
</script>
