<!-- TODO - this should really be an entire separate Editor component -->
<!-- Should not even be SCOPED to the generator module -->
<template>
  <b-tabs lazy class='w-100'>
    <!-- Generator Option Groups -->
    <b-tab
      lazy
      class='pt-0'
      :title="group.label_plural || group.label"
      v-for="group in model.option_groups"
      :key="group.identifier"
    >
      <br>

      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <template v-if="group.type === OPTION_GROUP_TYPE_GLOBAL_OPTION">
        <b-row class='justify-content-center'>
          <b-col lg=9>
            <EditorHeader
              :title="group.label"
              :help="group.description"
              url="https://codotype.github.io"
            />
            <hr>
          </b-col>
        </b-row>
      </template>

      <!-- OPTION_GROUP_TYPE_GLOBAL_BOOLEAN_GROUP -->
      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <template v-else-if="group.type === OPTION_GROUP_TYPE_GLOBAL_BOOLEAN_GROUP">

        <b-row class='justify-content-center'>
          <b-col lg=9 class='border-right'>
            <EditorHeader
              :brs="true"
              :title="group.label"
              :help="group.description"
              url="https://codotype.github.io"
            />
            <hr>
          </b-col>
          <b-col lg=9>
            <div class="mt-2">
              <ul class="list-group">
                <li
                  class="list-group-item list-group-item-action"
                  v-for="attr in group.attributes"
                  :key="attr.identifier">
                  <OptionFormItem
                    :model="attr"
                    :group="group"
                  />
                </li>
              </ul class="list-group">
            </div>

            <div class="card card-body text-center bg-transparent border-warning text-warning" v-if="!group.attributes[0]">
              <p class="lead mb-0">No options exposed by this generator</p>
            </div>
          </b-col>
        </b-row>

      </template>

      <template v-else>
        <EditorHeader
          :title="group.label_plural || group.label"
          :help="group.description"
          url="https://codotype.github.io"
        />
        <hr>
      </template>

      <!-- <div class="card card-body text-center bg-transparent border-warning text-warning" v-if="!group.attributes[0]"> -->
        <!-- <p class="lead mb-0">No options exposed by this generator</p> -->
      <!-- </div> -->

      <ModelAddonEditor
        v-if="group.type === OPTION_GROUP_TYPE_MODEL_ADDON"
        :group="group"
        :schemas="schemas">
      </ModelAddonEditor>

      <ModelOptionEditor
        v-if="group.type === OPTION_GROUP_TYPE_MODEL_OPTION"
        :group="group"
        :schemas="schemas">
      </ModelOptionEditor>

      <GlobalOptionEditor
        v-if="group.type === OPTION_GROUP_TYPE_GLOBAL_OPTION"
        :group="group">
      </GlobalOptionEditor>

    </b-tab>

  </b-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import buildConfiguration from '@codotype/util/lib/buildConfiguration'
import OptionFormItem from '../../option/components/OptionFormItem'
import GlobalOptionEditor from './GlobalOptionEditor'
import ModelOptionEditor from './ModelOptionEditor'
import ModelAddonEditor from './ModelAddonEditor'
import {
  OPTION_GROUP_TYPE_GLOBAL_OPTION,
  OPTION_GROUP_TYPE_GLOBAL_ADDON,
  OPTION_GROUP_TYPE_MODEL_OPTION,
  OPTION_GROUP_TYPE_MODEL_ADDON,
  OPTION_GROUP_TYPE_GLOBAL_BOOLEAN_GROUP
} from '@codotype/types/lib/option-group-types'

export default {
  name: 'GeneratorShow',
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
    GlobalOptionEditor,
    ModelOptionEditor,
    ModelAddonEditor,
    OptionFormItem
  },
  created () {
    console.log('CREATED!')
    console.log(this.id)
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
