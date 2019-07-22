<template>
  <b-modal
    lazy
    size="md"
    :visible="showingModal"
    :title="'Project Name'"
    ok-title='Update Project Name'
    ok-variant='primary'
    cancel-title='Cancel'
    cancel-variant='light'
    :ok-disabled="disableSubmit"
    @ok="submitForm()"
    @hide="showModal(false)"
  >
    <ProjectForm />
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ProjectForm from './ProjectForm'

export default {
  name: 'EditProjectModal',
  components: {
    ProjectForm
  },
  computed: mapGetters({
    disableSubmit: 'editor/project/disableSubmit',
    showingModal: 'editor/project/modals/form/showing'
  }),
  methods: {
    ...mapActions({
      submitForm: 'editor/project/submitForm',
    }),
    ...mapMutations({
      showModal: 'editor/project/modals/form/showing',
    })
  }
}
</script>
