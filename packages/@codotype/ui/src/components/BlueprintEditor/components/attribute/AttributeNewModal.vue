<template>
  <b-modal
    lazy
    size="lg"
    :visible="showingModal"
    :title="'New Attribute'"
    ok-title='Submit'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
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
    showingModal: 'editor/schema/attribute/modals/new/showing'
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
