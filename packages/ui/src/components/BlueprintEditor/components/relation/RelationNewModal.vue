<template>
  <b-modal
    lazy
    size="lg"
    :visible="showingModal"
    :title="'New Relation'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="submit(newModel)"
    @hide="showModal(false)"
  >
    <RelationForm :model="newModel" />
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
    showingModal: 'editor/schema/relation/modals/new/showing',
    newModel: 'editor/schema/relation/collection/newModel'
  }),
  methods: {
    ...mapActions({
      createModel: 'editor/schema/relation/collection/create',
      updateParentSchemaRelations: 'editor/schema/updateRelations'
    }),
    ...mapMutations({
      showModal: 'editor/schema/relation/modals/new/showing',
      setNewModel: 'editor/schema/relation/collection/newModel'
    }),
    submit (newModel) {
      this.setNewModel(newModel)
      this.createModel(),
      this.updateParentSchemaRelations()
    }
  }
}
</script>
