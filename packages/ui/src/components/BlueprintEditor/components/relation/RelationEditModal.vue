<template>
  <b-modal
    lazy
    size="lg"
    :visible="showingModal"
    :title="'Edit Relation'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="submit(editModel)"
    @hide="showModal(false)"
  >
    <RelationForm :model="editModel" />
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import RelationForm from './RelationForm'

export default {
  name: 'RelationNewModal',
  components: {
    RelationForm
  },
  computed: mapGetters({
    showingModal: 'editor/schema/relation/modals/edit/showing',
    editModel: 'editor/schema/relation/collection/editModel'
  }),
  methods: {
    ...mapActions({
      updateModel: 'editor/schema/relation/collection/update',
      updateParentSchema: 'editor/schema/updateRelations'
    }),
    ...mapMutations({
      showModal: 'editor/schema/relation/modals/edit/showing',
      setEditModel: 'editor/schema/relation/collection/editModel'
    }),
    submit (editModel) {
      this.setEditModel(editModel)
      this.updateModel()
      this.updateParentSchema()
    }
  }
}
</script>
