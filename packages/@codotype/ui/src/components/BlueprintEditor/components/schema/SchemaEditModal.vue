<template>
  <b-modal
    lazy
    size="lg"
    :visible="showingModal"
    :title="'Edit Schema'"
    ok-title='Update Schema'
    ok-variant='primary'
    cancel-title='Cancel'
    cancel-variant='light'
    :ok-disabled="!enableSubmit"
    @ok="updateModel()"
    @hide="showModal(false)"
  >
    <SchemaForm :enableSubmit="enableSubmit" :onKeypressEnter="onKeypressEnter" />
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SchemaForm from './SchemaForm'

export default {
  name: 'SchemaEditModal',
  components: {
    SchemaForm
  },
  computed: mapGetters({
    enableSubmit: 'editor/schema/enableSubmit',
    showingModal: 'editor/schema/modals/edit/showing'
  }),
  methods: {
    onKeypressEnter() {
      this.updateModel()
      this.showModal(false)
    },
    ...mapActions({
      updateModel: 'editor/schema/updateModel',
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/edit/showing',
    })
  }
}
</script>
