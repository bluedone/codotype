<template>
  <b-row class='align-items-center w-100 justify-content-center'>
    <b-col lg=6>
      <h4>Let's give your project a name</h4>
      <p class="lead form-text text-muted">Try something simple, like <code>Todo List</code>, or <code>Inventory Manager</code>

      </p>

      <p class="text-muted">No need to be picky, you can change it later.</p>

      <!-- <small class="text-muted">The Project Name will appear in the header of the app we're building - you can change it later.</small> -->
    </b-col>
    <b-col lg=6>
      <input
        ref="input_el"
        class="form-control form-control-lg"
        v-model="projectLabel"
        placeholder="Project Name"
        @keyup.enter="onKeyEnter()"
      />

      <small class="text-muted">Identifier: {{identifier || 'project_name'}}</small>

      <br>

      <b-button
        size="lg"
        block
        variant="primary"
        :disabled="!enableSubmit"
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
  mounted () {
    setTimeout(() => { this.$refs.input_el.focus() }, 200) // Minor delay for input element focus
  },
  computed: {
    ...mapGetters({
      label: 'editor/project/label',
      identifier: 'editor/project/identifier',
      enableSubmit: 'editor/project/enableSubmit'
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
  methods: {
    ...mapActions({
      incrementStep: 'build/steps/increment'
    }),
    onKeyEnter () {
      if (this.enableSubmit) {
        this.incrementStep()
      }
    }
  }
}
</script>
