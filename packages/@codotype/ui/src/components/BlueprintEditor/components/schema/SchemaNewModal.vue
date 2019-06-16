<template>
  <b-modal
    lazy
    size="lg"
    :visible="showingModal"
    :title="'New Schema'"
    ok-title='Create Schema'
    ok-variant='primary'
    cancel-title='Cancel'
    cancel-variant='light'
    :ok-disabled="!enableSubmit"
    @ok="createModel()"
    @hide="showModal(false)"
  >
    <SchemaForm :enableSubmit="enableSubmit" :onKeypressEnter="onKeypressEnter" />
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SchemaForm from './SchemaForm'

export default {
  name: 'SchemaNewModal',
  components: {
    SchemaForm
  },
  computed: mapGetters({
    enableSubmit: 'editor/schema/enableSubmit',
    showingModal: 'editor/schema/modals/new/showing'
  }),
  methods: {
    onKeypressEnter() {
      this.createModel()
      this.showModal(false)
    },
    ...mapActions({
      createModel: 'editor/schema/createModel',
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/new/showing',
    })
  }
}
</script>
