<!-- TODO - this should really be an entire separate Editor component -->
<!-- Should not even be SCOPED to the generator module -->
<template>
  <!-- <b-tabs no-fade pills vertical lazy nav-wrapper-class="w-25 h-100 pr-3 border-right" class='w-100'> -->
  <b-tabs no-fade lazy class='w-100'>
    <!-- Generator Option Groups -->
    <b-tab
      lazy
      class='pt-0'
      :title="group.label_plural || group.label"
      v-for="group in model.option_groups"
      :key="group.identifier"
    >
      <b-row class='justify-content-center mt-3'>
        <b-col lg=12>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditorHeader from '../../../components/EditorHeader'
import GlobalOptionEditor from './GlobalOptionEditor'
import ModelOptionEditor from './ModelOptionEditor'
import ModelAddonEditor from './ModelAddonEditor'
import GlobalAddonEditor from './GlobalAddonEditor'

import {
  OPTION_GROUP_TYPE_GLOBAL_OPTION,
  OPTION_GROUP_TYPE_GLOBAL_ADDON,
  OPTION_GROUP_TYPE_MODEL_OPTION,
  OPTION_GROUP_TYPE_MODEL_ADDON,
  OPTION_GROUP_TYPE_GLOBAL_BOOLEAN_GROUP
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
      OPTION_GROUP_TYPE_MODEL_ADDON,
      OPTION_GROUP_TYPE_GLOBAL_BOOLEAN_GROUP
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
