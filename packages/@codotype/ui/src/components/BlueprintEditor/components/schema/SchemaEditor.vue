<template>
  <b-row class='d-flex justify-content-center'>
    <b-col sm=12>
      <b-row class='d-flex justify-content-center mt-3' v-if="!schemas[0]">
        <b-col sm=10>
          <SchemaEmptyState />
        </b-col>
      </b-row>
      <b-row class='mt-3' v-else>
        <b-col sm=12 md=4 lg=3 xl=3 class='border-right'>
          <SchemaNewButton />
          <SchemaNewModal />

          <HelpPopover
            target="new-schema-button"
            placement="bottom"
            content='Create New Schema'>
          </HelpPopover>
          <SchemaList />
        </b-col>

        <b-col sm=12 md=8 lg=9 xl=9>
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
