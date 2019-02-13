<!-- TODO - this should really be an entire separate Editor component -->
<!-- Should not even be SCOPED to the generator module -->
<template>
  <b-tabs lazy class='w-100' v-model="currentStep">
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
      <template v-if="group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION'">
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
      <template v-else-if="group.type === 'OPTION_GROUP_TYPE_GLOBAL_BOOLEAN_GROUP'">

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
        v-if="group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON'"
        :group="group"
        :schemas="schemas">
      </ModelAddonEditor>

      <ModelOptionEditor
        v-if="group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION'"
        :group="group"
        :schemas="schemas">
      </ModelOptionEditor>

      <GlobalOptionEditor
        v-if="group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION'"
        :group="group">
      </GlobalOptionEditor>

    </b-tab>

  </b-tabs>
</template>

<script>
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'
import buildConfiguration from '@codotype/util/lib/buildConfiguration'
import OptionFormItem from '../../option/components/OptionFormItem'
import OptionTemplateRenderer from '../../option/components/OptionTemplateRenderer'
import GlobalOptionEditor from './GlobalOptionEditor'
import ModelOptionEditor from './ModelOptionEditor'
import ModelAddonEditor from './ModelAddonEditor'

export default {
  name: 'GeneratorShow',
  props: ['id'],
  data () {
    return {
      currentStep: 0,
      newAddon: {}, // TODO - this should be produced somewhere & maintained in state
      selectedSchemaId: this.$store.getters['editor/schema/collection/items'][0].identifier // TODO - retire this
    }
  },
  components: {
    GlobalOptionEditor,
    ModelOptionEditor,
    ModelAddonEditor,
    OptionTemplateRenderer,
    OptionFormItem
  },
  created () {
    this.selectModel(this.id)
  },
  methods: {
    ...mapActions({
      selectModel: 'generator/selectModel'
    }),
    ...mapGetters({
      getModel: 'generator/getModel'
    }),
    decrementStep () {
      this.currentStep = Math.max(this.currentStep - 1, 0)
    },
    incrementStep () {
      this.currentStep = Math.min(this.currentStep + 1, 2 + this.model.option_groups.length)
    },
    createAddonInstance (group) {
      this.newAddon.id = Math.random().toString()
      this.configurationObject[group.identifier_plural][this.selectedSchemaId].push(this.newAddon)
      this.newAddon = {}
    },
    destroyInstance (group, instance) {
      const filtered = this.configurationObject[group.identifier_plural][this.selectedSchemaId].filter(e => e.id !== instance.id)
      this.configurationObject[group.identifier_plural][this.selectedSchemaId] = filtered
    }
  },
  computed: {
    configurationObject () {
      // Pulls the schemas to define the build configuration
      const schemas = this.schemas
      // const generator = this.$store.getters['generator/collection'].find(g => g.id === this.id)
      const generator = this.$store.getters['generator/getModel'](this.id)
      return buildConfiguration({ schemas, generator })
    },
    compiledMarkdown () {
      return marked(this.model.readme, { sanitize: true })
    },
    ...mapGetters({
      model: 'generator/selectedModel',
      modelGetter: 'generator/getModel',
      schemas: 'editor/schema/collection/items'
    }),
    selectedSchema () {
      return this.schemas.find(s => s.identifier === this.selectedSchemaId)
    }
  }
}
</script>
