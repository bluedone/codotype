<template>
  <div class="card card-body shadow-sm">
    <h4 class="mb-0">Configure Generator</h4>

    <p class="small mt-2 mb-0 text-muted">Configure the <span class="text-success">Generator</span> to tune the way your code will be generated.</p>

    <hr />

    <b-tabs no-fade lazy pills class="w-100">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditorHeader from '../../../../components/EditorHeader'
import GlobalOptionEditor from './components/GlobalOptionEditor'
import ModelOptionEditor from './components/ModelOptionEditor'
import ModelAddonEditor from './components/ModelAddonEditor'
import GlobalAddonEditor from './components/GlobalAddonEditor'

import {
  CONFIGURATION_GROUP_TYPE_OPTION,
  CONFIGURATION_GROUP_TYPE_ADDON,
  CONFIGURATION_GROUP_SCOPE_GLOBAL,
  CONFIGURATION_GROUP_SCOPE_SCHEMA
} from '@codotype/types/lib/configuration-group-types'

export default {
  name: 'ConfigureGenerator',
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      CONFIGURATION_GROUP_TYPE_OPTION,
      CONFIGURATION_GROUP_TYPE_ADDON,
      CONFIGURATION_GROUP_SCOPE_GLOBAL,
      CONFIGURATION_GROUP_SCOPE_SCHEMA
    }
  },
  components: {
    EditorHeader,
    GlobalOptionEditor,
    ModelOptionEditor,
    ModelAddonEditor,
    GlobalAddonEditor
  },
  created () {
    this.$store.dispatch('build/selectBuild', this.id)
    this.selectModel(this.id)
  },
  methods: {
    ...mapActions({
      selectModel: 'generator/selectModel'
    })
  },
  computed: {
    ...mapGetters({
      model: 'generator/selectedModel',
      schemas: 'editor/schema/collection/items'
    })
  }
}
</script>
