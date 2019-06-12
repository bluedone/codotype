<template>
  <b-modal
    lazy
    size="lg"
    :visible="showingModal"
    :title="'Edit Attribute'"
    ok-title='Update Attribute'
    ok-variant='success'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="updateModel()"
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
    showingModal: 'editor/schema/attribute/modals/edit/showing'
  }),
  methods: {
    ...mapActions({
      updateModel: 'editor/schema/attribute/updateModel'
    }),
    ...mapMutations({
      showModal: 'editor/schema/attribute/modals/edit/showing'
    })
  }
}
</script>
