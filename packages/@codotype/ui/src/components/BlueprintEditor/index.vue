<template>
  <div class="card card-body shadow-sm mb-4">
    <b-row class='d-flex align-items-center'>
      <b-col sm=6>
        <span class='d-flex align-items-center'>
          <h4 class="mb-0 mr-2 d-flex">{{projectName}}</h4>
          <ProjectEditButton />
          <EditProjectModal />
          <HelpPopover
            target="projectEditPopover"
            placement="right"
            :triggers="['hover']"
            content='Edit Project Name'>
          </HelpPopover>
        </span>
      </b-col>
      <b-col sm=6 class='d-flex justify-content-end'>
        <HelpButton />
        <TourButton />
        <ProjectDropdown />
        <GenerateCodeButton />
        <ImportModal />
        <ExportModal />
      </b-col>
      <b-col sm=12>
        <hr />
      </b-col>
    </b-row>

    <b-row>
      <b-col sm=12>
        <b-tabs>
          <b-tab
            title="Schemas"
            lazy
            active
            v-if="!model.self_configuring"
          >
            <SchemaEditor />
          </b-tab>

          <b-tab
            lazy
            class='pt-0'
            v-for="group, index in model.configuration_groups"
            :title="group.label_plural || group.label"
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
import SchemaEditor from './components/schema/SchemaEditor'
import GenerateCodeButton from '../../modules/build/components/GenerateCodeButton'
import HelpButton from '../HelpButton'
import TourButton from '../TourButton'
import HelpPopover from '../HelpPopover'
import EditorHeader from '../EditorHeader'
import GlobalOptionEditor from '../../modules/build/components/ConfigurationEditor/components/GlobalOptionEditor'
import ModelOptionEditor from '../../modules/build/components/ConfigurationEditor/components/ModelOptionEditor'
import ModelAddonEditor from '../../modules/build/components/ConfigurationEditor/components/ModelAddonEditor'
import GlobalAddonEditor from '../../modules/build/components/ConfigurationEditor/components/GlobalAddonEditor'
import EditProjectModal from './components/project/EditProjectModal'
import ProjectEditButton from './components/project/ProjectEditButton'
import ProjectDropdown from './components/project/ProjectDropdown'

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
    HelpPopover,
    HelpButton,
    TourButton,
    ImportModal,
    ExportModal,
    SchemaEditor,
    GenerateCodeButton,
    EditorHeader,
    GlobalOptionEditor,
    ModelOptionEditor,
    ModelAddonEditor,
    GlobalAddonEditor,
    EditProjectModal,
    ProjectEditButton,
    ProjectDropdown
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
