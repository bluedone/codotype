<template>
  <b-modal
    lazy
    :visible="$store.getters[`editor/modals/import/showing`]"
    title="Import Blueprint"
    ok-title='Import'
    cancel-title='Cancel'
    :ok-disabled="okDisabled"
    @ok="$store.dispatch('editor/import', blueprintJson)"
    @hide="$store.commit(`editor/modals/import/showing`, false)"
  >
    <p class="form-text text-muted mb-2">Import a Codotype Blueprint stored in a .JSON file</p>

    <div class="input-group mb-3">
      <div class="custom-file">
        <input
          type="file"
          class="custom-file-input"
          accept=".json"
          id="inputGroupFile01"
          @change="processFile($event)">
        <label class="custom-file-label" for="inputGroupFile01">Choose Blueprint</label>
      </div>
    </div>

    <small class="text-success" v-if="uploaded && blueprintValid">
      <i class="fa fa-check-circle"></i>
      Imports the {{blueprintJson.label}} Blueprint with {{blueprintJson.schemas.length}} models
    </small>

    <small class="text-danger" v-if="uploaded && !blueprintValid">
      <i class="fa fa-times-circle"></i>
      Invalid blueprint format
    </small>

  </b-modal>
</template>

<script>
export default {
  name: 'ImportBlueprint',
  data () {
    return {
      blueprintJson: {},
      uploaded: false,
      okDisabled: true,
      blueprintValid: false
    }
  },
  methods: {
    processFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      this.okDisabled = true
      // TODO - add a try/catch statement here
      // TODO - validate parsed blueprint in Vuex store
      reader.onload = (e) => {
        this.uploaded = true
        this.blueprintJson = JSON.parse(e.target.result)
        this.blueprintJson.id = null
        if (this.blueprintJson.schemas && this.blueprintJson.label) {
          this.okDisabled = false
          this.blueprintValid = true
        }
      }
      reader.readAsText(file)
    }
  }
}
</script>
