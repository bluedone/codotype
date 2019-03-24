<template>
  <b-row>

    <b-col xl=4 lg=4 sm=12 class="border-right">
      <ImportModal />
      <ExportModal />

      <SchemaNewModal />
      <SchemaNewButton />

      <HelpPopover
        target="new-model-button"
        placement="bottom"
        content='Create New Model'>
      </HelpPopover>

      <SchemaList />
    </b-col>

    <b-col xl=8 lg=8 sm=12>
      <SchemaDetail id="model-detail" />
    </b-col>

  </b-row>
</template>

<script>
import ImportModal from './components/ImportModal'
import ExportModal from './components/ExportModal'
import SchemaNewButton from './components/schema/SchemaNewButton'
import SchemaNewModal from './components/schema/SchemaNewModal'
import SchemaList from './components/schema/SchemaList'
import SchemaDetail from './components/schema/SchemaDetail'
import HelpPopover from '../HelpPopover'

export default {
  name: 'BlueprintEditor',
  components: {
    ImportModal,
    ExportModal,
    SchemaNewButton,
    SchemaNewModal,
    HelpPopover,
    SchemaList,
    SchemaDetail
  },
  created () {
    this.$store.dispatch('editor/created')
  }
}
</script>
