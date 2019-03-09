<template>
  <b-row>

    <div class="col-lg-12">
      <b-form>
        <p class="mb-2 form-text text-muted">Define the core metadata that's used to create a valid model.</p>
        <b-form-input
          size="lg"
          v-model="schemaLabel"
          placeholder="Model Label"
          ref="input_el"
        />
      </b-form>
    </div>

    <div class="col-lg-12">
      <p class="mb-2 form-text text-muted">Validate the results below before submission</p>

      <table class="table table-sm">
        <tbody>
          <tr>
            <td>
              Label
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Label" is the human readable token for this model'></i>
            </td>
            <td>{{ model.label || '...' }}</td>
          </tr>
          <tr>
            <td>Label Plural</td>
            <td>{{ model.label_plural || '...' }}</td>
          </tr>
          <tr>
            <td>
              Identifier
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Identifier" is the lowecase, underscored token for this model'></i>
            </td>
            <td>{{ model.identifier || '...' }}</td>
          </tr>
          <tr>
            <td>Identifier Plural</td>
            <td>{{ model.identifier_plural || '...' }}</td>
          </tr>
          <tr>
            <td>
              Class Name
              <i class="fa text-secondary fa-question-circle" v-b-tooltip.hover.right title='"Class Name" is title-cased whitespace-free token for this model'></i>
            </td>
            <td>{{ model.class_name || '...' }}</td>
          </tr>
          <tr>
            <td>Class Name Plural</td>
            <td>{{ model.class_name_plural || '...' }}</td>
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
