<template>
  <b-row>

    <div class="col-sm-12 col-lg-6 border-right">
      <div class="row">

        <div class="col-sm-12">

          <h4>New Schema</h4>

          <p class="small mt-2 mb-3 text-muted"><span class='text-success'>Label</span> should be a <strong>singular noun</strong> - whitespace is allowed. The input field will enforce proper capitalization and spacing.</p>

          <small class="mb-2 text-muted">
            <i class="far fa-lightbulb"></i>
            Try something simple like <code>Movie</code>, or <code>Movie Rating</code>
          </small>

          <b-form-input
            size="lg"
            v-model="schemaLabel"
            placeholder="Label"
            ref="input_el"
          />

          <p class="small mt-4 text-muted">
            <strong>Codotype</strong> derives additional <span class='text-success'>Tokens</span> to use for things like naming <strong>files</strong>, <strong>folders</strong>, <strong>variables</strong>, and <strong>database tables</strong>. You can rename or remove a schema whenever you like <i class="far fa-laugh"></i>
          </p>

        </div>
      </div>
    </div>

    <div class="col-sm-12 col-lg-6 d-flex justify-content-center align-items-center flex-column">
      <p class="mb-0 text-muted">Verify these <span class='text-success'>Tokens </span> before proceeding</p>

      <table class="table table-sm mb-0 mt-2">
        <tbody>
          <tr>
            <td>
              Label
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Label" is the human readable token for this model'></i>
            </td>
            <td class='text-success'>{{ model.label || '...' }}</td>
          </tr>
          <tr>
            <td>Label Plural</td>
            <td class='text-success'>{{ model.label_plural || '...' }}</td>
          </tr>
          <tr>
            <td>
              Identifier
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Identifier" is the lowecase, underscored token for this model'></i>
            </td>
            <td class='text-success'>{{ model.identifier || '...' }}</td>
          </tr>
          <tr>
            <td>Identifier Plural</td>
            <td class='text-success'>{{ model.identifier_plural || '...' }}</td>
          </tr>
          <tr>
            <td>
              Class Name
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Class Name" is title-cased whitespace-free token for this model'></i>
            </td>
            <td class='text-success'>{{ model.class_name || '...' }}</td>
          </tr>
          <tr>
            <td>Class Name Plural</td>
            <td class='text-success'>{{ model.class_name_plural || '...' }}</td>
          </tr>
        </tbody>
      </table>

    </div>

  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SchemaForm',
  mounted () {
    setTimeout(() => { this.$refs.input_el.focus() }, 500)
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/form/model'
    }),
    schemaLabel: {
      get () {
        return this.model.label
      },
      set (label) {
        this.$store.dispatch('editor/schema/setLabel', label)
      }
    }
  }
}
</script>

<style type="text/css" scoped>
  .table-sm {
    font-size: 80%;
  }

  p.small {
    font-size: 85%;
  }

  .text-purple {
    color: purple !important;
  }
</style>
