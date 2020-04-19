<template>
  <div class="card card-body">
    <b-row class='align-items-center justify-content-center'>
      <b-col lg=12>
        <SchemaForm :onKeypressEnter="createModel" :enableSubmit="enableSubmit" />
      </b-col>
      <b-col lg=12 class="text-right">
        <b-button
          variant="primary"
          @click="createModel()"
          :disabled="!enableSubmit"
        >
          Create Schema
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SchemaNewButton from './SchemaNewButton'
import SchemaForm from './SchemaForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SchemaEmptyState',
  components: {
    SchemaNewButton,
    SchemaForm
  },
  mounted () {
    this.resetForm()
  },
  computed: mapGetters({
    enableSubmit: 'editor/schema/enableSubmit'
  }),
  methods: mapActions({
    resetForm: 'editor/schema/resetNewModel',
    createModel: 'editor/schema/createModel',
  })
}
</script>
