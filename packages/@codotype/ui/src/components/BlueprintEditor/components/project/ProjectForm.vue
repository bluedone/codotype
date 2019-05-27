<template>
  <div class="card card-body shadow-sm">
    <b-row class='align-items-center justify-content-center'>
      <b-col lg=12>

        <h4>Project Name</h4>

        <p class="small mt-2 mb-3 text-muted"><span class="text-success">Project Name</span> must be <strong>alphabetic</strong> - no numbers or symbols, but whitespace is allowed. The input field will enforce proper capitalization and spacing.</p>

        <small class="mb-2 text-muted">
          <i class="far fa-lightbulb"></i>
          Try something simple like <code>Todo List</code>, or <code>Inventory Manager</code>
        </small>

        <input
          ref="input_el"
          id="project-label"
          class="form-control form-control-lg"
          v-model="projectLabel"
          placeholder="Project Name"
          @keyup.enter="onKeyEnter()"
        />

        <small class="text-muted">Identifier: {{identifier || 'project_name'}}</small>

        <p class="small mt-2 text-muted">
          <strong>Codotype</strong> uses the <span class='text-success'>Project Name</span> for naming things like <strong>files</strong>, <strong>folders</strong>, <strong>namespaces</strong>, and <strong>databases</strong>. No need to be picky, you can rename your Project whenever you like <i class="far fa-laugh"></i>
        </p>

        <HelpPopover
          target="project-label"
          placement="left"
          content='Give your project a name'>
        </HelpPopover>

        <HelpPopover
          target="submit-project-form"
          placement="left"
          content='Click here to continue'>
        </HelpPopover>

        <b-button
          size="lg"
          id="submit-project-form"
          block
          variant="success"
          :disabled="!enableSubmit"
          @click="incrementStep()"
        >
          Define Schemas
          <i class="fa fa-chevron-right ml-2"></i>
          <i class="fa fa-chevron-right"></i>
          <i class="fa fa-chevron-right"></i>
        </b-button>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HelpPopover from '../../../HelpPopover'

export default {
  name: 'ProjectForm',
  components: {
    HelpPopover
  },
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
