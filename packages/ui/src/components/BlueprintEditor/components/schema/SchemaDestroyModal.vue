<template>
  <b-modal
    lazy
    :visible="showingModal"
    title='Destroy Model'
    ok-title='DESTROY'
    ok-variant='danger'
    cancel-title='Cancel'
    cancel-variant='light'
    @ok="submit(newModel)"
    @hide="showModal(false)"
  >

    <b-form>
      <p class="mb-2 form-text text-muted">Are you sure you want to destroy the {{ label }} model?</p>
    </b-form>

  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'SchemaDestroyModal',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  computed: mapGetters({
    showingModal: 'editor/schema/modals/destroy/showing',
  }),
  methods: {
    ...mapActions({
      destroySchema: 'editor/schema/collection/destroy'
    }),
    ...mapMutations({
      showModal: 'editor/schema/modals/destroy/showing',
    }),
    submit (newModel) {
      this.destroySchema()
    }
  }
}
</script>
