<template>
  <b-modal
    lazy
    size="lg"
    :visible="showingModal"
    :title="'New Attribute'"
    ok-title='Create Attribute'
    ok-variant='primary'
    cancel-title='Cancel'
    cancel-variant='light'
    :ok-disabled="!enableSubmit"
    @ok="createModel()"
    @hide="showModal(false)"
  >
    <AttributeForm />
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import AttributeForm from '../attribute/AttributeForm'

export default {
  name: 'AttributeNewModal',
  components: {
    AttributeForm
  },
  computed: mapGetters({
    showingModal: 'editor/schema/attribute/modals/new/showing',
    enableSubmit: 'editor/schema/attribute/enableSubmit',
    // formErrors: 'editor/schema/attribute/formErrors // TODO - this should be wired up
  }),
  methods: {
    ...mapActions({
      createModel: 'editor/schema/attribute/createModel'
    }),
    ...mapMutations({
      showModal: 'editor/schema/attribute/modals/new/showing'
    })
  }
}
</script>
