<template>
  <b-row class='align-items-center w-100 justify-content-center'>
    <b-col lg=6>
      <h4>Let's give your project a name</h4>
      <p class="lead form-text text-muted">Try something simple, like <code>ToDo List</code>, or <code>Inventory Manager</code>

      </p>

      <p>No need to be picky, you can change it later.</p>

      <small class="text-muted">The Project Name will appear in the header of the app we're building - you can change it later.</small>
    </b-col>
    <b-col lg=6>
      <b-form-input size="lg" v-model="projectLabel" placeholder="Project Name" />

      <br>

      <b-button
        size="lg"
        block
        variant="primary"
        @click="incrementStep()"
      >
        Let's Go!
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectForm',
  computed: {
    ...mapGetters({
      label: 'editor/project/label',
      identifier: 'editor/project/identifier'
    }),
    projectLabel: {
      get () {
        return this.label
      },
      set (label) {
        this.$store.dispatch('editor/project/setLabel', label)
      }
    }
  },
  methods: mapActions({
    incrementStep: 'build/steps/increment'
  })
}
</script>
