<template>
  <div class="card card-body shadow-sm">
    <b-row class='d-flex align-items-center'>
      <b-col sm=6>
        <span class='d-flex align-items-center'>
          <h4 class="mb-0 mr-2 d-flex">{{projectName}}</h4>
          <ProjectEditButton />
          <EditProjectModal />
        </span>
      </b-col>
      <b-col sm=6 class='d-flex justify-content-end'>
        <b-dropdown
          no-caret
          size="sm"
          variant="light"
          class='mr-2'
          toggle-class='rounded'
        >
          <template slot="button-content">
            <i class="fa fa-fw fa-ellipsis-h" />
          </template>

          <b-dropdown-item-button @click="$store.commit('editor/modals/import/showing', true)">
            <i class="fa fa-fw fa-upload"></i>
            Import Project
          </b-dropdown-item-button>

          <b-dropdown-item-button @click="$store.commit('editor/modals/export/showing', true)">
            <i class="fa fa-fw fa-download"></i>
            Export Project
          </b-dropdown-item-button>

        </b-dropdown>
        <GenerateCodeButton />
      </b-col>
      <b-col sm=12>
        <hr />
      </b-col>
    </b-row>

    <b-row>
      <b-col sm=12>
        <b-tabs>
          <b-tab title="Schemas" lazy active>
            <b-row class='mt-4 d-flex justify-content-center' v-if="!schemas[0]">
              <b-col sm=10>
                <SchemaEmptyState />
              </b-col>
            </b-row>
            <b-row class='mt-3' v-else>
              <b-col xl=3 lg=3 sm=12 class='border-right'>
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

              <b-col xl=9 lg=9 sm=12>
                <SchemaDetail />
              </b-col>
            </b-row>
          </b-tab>

          <b-tab
            lazy
            class='pt-0'
            :title="group.label_plural || group.label"
            v-for="group in model.configuration_groups"
            :key="group.identifier"
          >
            <b-row class="justify-content-center mt-3">
              <b-col lg=12 id="configuration">
                <EditorHeader
                  :title="group.label"
                  :help="group.description"
                  url="https://codotype.github.io"
                />
                <hr />

                <ModelAddonEditor
                  v-if="group.type === CONFIGURATION_GROUP_TYPE_ADDON && group.scope === CONFIGURATION_GROUP_SCOPE_SCHEMA"
                  :group="group"
                  :schemas="schemas">
                </ModelAddonEditor>

                <GlobalAddonEditor
                  v-if="group.type === CONFIGURATION_GROUP_TYPE_ADDON && group.scope === CONFIGURATION_GROUP_SCOPE_GLOBAL"
                  :group="group">
                </GlobalAddonEditor>

                <ModelOptionEditor
                  v-if="group.type === CONFIGURATION_GROUP_TYPE_OPTION && group.scope === CONFIGURATION_GROUP_SCOPE_SCHEMA"
                  :group="group"
                  :schemas="schemas">
                </ModelOptionEditor>

                <GlobalOptionEditor
                  v-if="group.type === CONFIGURATION_GROUP_TYPE_OPTION && group.scope === CONFIGURATION_GROUP_SCOPE_GLOBAL"
                  :group="group">
                </GlobalOptionEditor>

              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ImportModal from './components/ImportModal'
import ExportModal from './components/ExportModal'
import SchemaNewButton from './components/schema/SchemaNewButton'
import SchemaNewModal from './components/schema/SchemaNewModal'
import SchemaList from './components/schema/SchemaList'
import SchemaDetail from './components/schema/SchemaDetail'
import SchemaEmptyState from './components/schema/SchemaEmptyState'
import HelpPopover from '../HelpPopover'
import GenerateCodeButton from '../../modules/build/components/GenerateCodeButton'
import EditorHeader from '../EditorHeader'
import GlobalOptionEditor from '../../modules/build/components/ConfigurationEditor/components/GlobalOptionEditor'
import ModelOptionEditor from '../../modules/build/components/ConfigurationEditor/components/ModelOptionEditor'
import ModelAddonEditor from '../../modules/build/components/ConfigurationEditor/components/ModelAddonEditor'
import GlobalAddonEditor from '../../modules/build/components/ConfigurationEditor/components/GlobalAddonEditor'
import EditProjectModal from './components/project/EditProjectModal'
import ProjectEditButton from './components/project/ProjectEditButton'

import {
  CONFIGURATION_GROUP_TYPE_OPTION,
  CONFIGURATION_GROUP_TYPE_ADDON,
  CONFIGURATION_GROUP_SCOPE_GLOBAL,
  CONFIGURATION_GROUP_SCOPE_SCHEMA
} from '@codotype/types/lib/configuration-group-types'

export default {
  name: 'BlueprintEditor',
  props: {
    id: {
      required: true
    }
  },
  components: {
    ImportModal,
    ExportModal,
    SchemaNewButton,
    SchemaNewModal,
    HelpPopover,
    SchemaList,
    SchemaDetail,
    SchemaEmptyState,
    GenerateCodeButton,
    EditorHeader,
    GlobalOptionEditor,
    ModelOptionEditor,
    ModelAddonEditor,
    GlobalAddonEditor,
    EditProjectModal,
    ProjectEditButton
  },
  created () {
    this.$store.dispatch('editor/created')
    this.selectModel(this.id)
  },
  data () {
    return {
      CONFIGURATION_GROUP_TYPE_OPTION,
      CONFIGURATION_GROUP_TYPE_ADDON,
      CONFIGURATION_GROUP_SCOPE_GLOBAL,
      CONFIGURATION_GROUP_SCOPE_SCHEMA
    }
  },
  methods: {
    ...mapActions({
      selectModel: 'generator/selectModel'
    })
  },
  computed: {
    ...mapGetters({
      projectName: 'editor/project/label',
      model: 'generator/selectedModel',
      schemas: 'editor/schema/collection/items'
    })
  }
}
</script>
