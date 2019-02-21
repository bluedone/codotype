<template>
  <b-modal
    lazy
    :visible="showingModal"
    :title="'Edit Model'"
    ok-title='Update'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="createModel(editModel)"
    @hide="showModal(false)"
  >
    <SchemaForm :model="editModel" />
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
    showingModal: 'editor/schema/modals/edit/showing',
    editModel: 'editor/schema/collection/editModel'
  }),
  methods: {
    ...mapActions({
      createModel: 'editor/schema/createModel',
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/edit/showing',
    })
  }
}
</script>
