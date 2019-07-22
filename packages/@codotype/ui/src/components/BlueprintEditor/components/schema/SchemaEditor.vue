<template>
  <b-row class='d-flex justify-content-center'>
    <b-col sm=12>
      <b-row v-if="!schemas[0]">
        <b-col sm=10>
          <SchemaEmptyState />
        </b-col>
      </b-row>
      <b-row class='mt-3' v-else>
        <b-col xl=3 lg=3 sm=12 class='border-right'>
          <HelpPopover
            target="new-schema-button"
            placement="bottom"
            content='Create New Schema'>
          </HelpPopover>

          <SchemaList />
        </b-col>

        <b-col xl=9 lg=9 sm=12>
          <SchemaDetail />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import HelpPopover from '../../../HelpPopover'
import SchemaDetail from './SchemaDetail'
import SchemaEmptyState from './SchemaEmptyState'
import SchemaList from './SchemaList'
import SchemaNewButton from './SchemaNewButton'
import SchemaNewModal from './SchemaNewModal'

export default {
  name: 'SchemaEditor',
  components: {
    HelpPopover,
    SchemaDetail,
    SchemaEmptyState,
    SchemaList,
    SchemaNewButton,
    SchemaNewModal,
  },
  computed: mapGetters({
      schemas: 'editor/schema/collection/items'
  })
}
</script>
