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
    :ok-disabled="!disableSubmit"
    @ok="createModel()"
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
    showingModal: 'editor/schema/relation/modals/new/showing',
    disableSubmit: 'editor/schema/relation/disableSubmit'
  }),
  methods: {
    ...mapActions({
      createModel: 'editor/schema/relation/createModel'
    }),
    ...mapMutations({
      showModal: 'editor/schema/relation/modals/new/showing'
    })
  }
}
</script>
