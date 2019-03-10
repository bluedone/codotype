<template>
  <b-modal
    lazy
    :visible="showingModal"
    :title="'Edit Model'"
    ok-title='Update'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    :ok-disabled="!enableSubmit"
    @ok="updateModel()"
    @hide="showModal(false)"
  >
    <SchemaForm />
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
    ...mapActions({
      updateModel: 'editor/schema/updateModel',
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/edit/showing',
    })
  }
}
</script>
