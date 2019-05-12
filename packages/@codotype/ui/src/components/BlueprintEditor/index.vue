<template>
  <b-row>

    <b-col xl=3 lg=3 sm=12>
      <ImportModal />
      <ExportModal />

      <SchemaNewModal />
      <SchemaNewButton />

      <HelpPopover
        target="new-schema-button"
        placement="bottom"
        content='Create New Schema'>
      </HelpPopover>

      <SchemaList />
    </b-col>

    <b-col xl=9 lg=9 sm=12 class="pl-0">
      <SchemaDetail />
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
