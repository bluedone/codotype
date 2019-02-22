<template>
  <b-modal
    lazy
    :visible="showingModal"
    :title="'New Model'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="createModel()"
    @hide="showModal(false)"
  >
    <SchemaForm />
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
    showingModal: 'editor/schema/modals/new/showing'
  }),
  methods: {
    ...mapActions({
      createModel: 'editor/schema/createModel',
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/new/showing',
    })
  }
}
</script>
