<template>
  <b-modal
    lazy
    :visible="$store.getters[`editor/modals/export/showing`]"
    title="Export Blueprint"
    ok-title='Export'
    cancel-title='Cancel'
    @ok="$store.dispatch('editor/export')"
    @hide="$store.commit(`editor/modals/export/showing`, false)"
  >
    <p class="form-text text-muted mb-2">Export a Codotype Blueprint stored as a .JSON file</p>

    <small class="text-muted">
      <i class="fa fa-info-circle"></i>
      The exported JSON file can be re-imported into the Codotype web UI, or used directly with the
      <a href="https://github.com/codotype/codotype-cli" target="_blank">Codotype CLI</a>
    </small>

  </b-modal>
</template>

<script>
export default {
  name: 'ExportBlueprint'
}
</script>
