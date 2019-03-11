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
    @ok="updateModel()"
    @hide="showModal(false)"
  >
    <RelationForm />
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
    showingModal: 'editor/schema/relation/modals/edit/showing'
  }),
  methods: {
    ...mapActions({
      updateModel: 'editor/schema/relation/updateModel'
    }),
    ...mapMutations({
      showModal: 'editor/schema/relation/modals/edit/showing'
    })
  }
}
</script>
