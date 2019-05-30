<template>
  <div class="card card-body shadow-sm">
    <b-tabs no-fade lazy pills class="w-100">

      <b-tab
        lazy
        class='pt-0'
        :title="group.label_plural || group.label"
        v-for="group in model.option_groups"
        :key="group.identifier"
      >
        <b-row class="justify-content-center mt-3">
          <b-col lg=12 id="configuration">
            <EditorHeader
              :title="group.label"
              :help="group.description"
              url="https://codotype.github.io"
            />
            <hr>

            <ModelAddonEditor
              v-if="group.type === OPTION_GROUP_TYPE_MODEL_ADDON"
              :group="group"
              :schemas="schemas">
            </ModelAddonEditor>

            <GlobalAddonEditor
              v-if="group.type === OPTION_GROUP_TYPE_GLOBAL_ADDON"
              :group="group">
            </GlobalAddonEditor>

            <ModelOptionEditor
              v-if="group.type === OPTION_GROUP_TYPE_MODEL_OPTION"
              :group="group"
              :schemas="schemas">
            </ModelOptionEditor>

            <GlobalOptionEditor
              v-if="group.type === OPTION_GROUP_TYPE_GLOBAL_OPTION"
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
  OPTION_GROUP_TYPE_GLOBAL_OPTION,
  OPTION_GROUP_TYPE_GLOBAL_ADDON,
  OPTION_GROUP_TYPE_MODEL_OPTION,
  OPTION_GROUP_TYPE_MODEL_ADDON
} from '@codotype/types/lib/option-group-types'

export default {
  name: 'ConfigureGenerator',
  props: {
    id: {
      required: true
    }
  },
  data () {
    return {
      OPTION_GROUP_TYPE_GLOBAL_OPTION,
      OPTION_GROUP_TYPE_GLOBAL_ADDON,
      OPTION_GROUP_TYPE_MODEL_OPTION,
      OPTION_GROUP_TYPE_MODEL_ADDON
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
