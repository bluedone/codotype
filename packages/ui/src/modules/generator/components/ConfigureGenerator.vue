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
                    v-model="configurationObject[group.identifier][attr.identifier]"
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

      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <template v-if="group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON'">
        <b-row>
          <b-col lg=3 class='border-right'>
            <div class="card">
              <div class="card-header">
                <strong>Models</strong>
              </div>
              <ul class="list-group list-group-flush">
                <li
                  v-for="schema in schemas"
                  :class='selectedSchemaId === schema.identifier ? "list-group-item active" : "list-group-item" '
                  @click="selectedSchemaId = schema.identifier"
                >
                  {{ schema.label }}
                </li>
              </ul>
            </div>
          </b-col>
          <b-col lg=9>
            <b-card>

              <!-- Header - "User API Actions" -->
              <p class="lead mb-0">
                {{ selectedSchema.label }} {{ group.label_plural }}
              </p>

              <!-- Header - Description -->
              <small class="text-muted">{{group.description}}</small>


              <!-- Define new instance -->
              <hr>

              <!-- Bootstrap Modal Component -->
              <b-modal
                :id="'modal_' + group.id"
                :title="'New ' + group.label"
                ok-variant='success'
                ok-title='Create'
                cancel-title='Cancel'
                @ok="createAddonInstance(group)"
              >
                <small class="text-muted">New {{group.label}}</small>

                <div class="row">
                  <div class="col-lg-6" v-for="attr in group.attributes">
                    <OptionFormItem
                      :model="attr"
                      :group="group"
                      :schema="selectedSchema"
                      v-model="newAddon[attr.identifier]"
                    />
                  </div>
                </div>

                <div class="row" v-if="group.previewTemplate">
                  Preview
                  <div class="col-lg-12">
                    <OptionTemplateRenderer
                      :model="newAddon"
                      :schema="selectedSchema"
                      :template="group.previewTemplate"
                    >
                    </OptionTemplateRenderer>
                  </div>
                </div>

              </b-modal>

              <b-button v-b-modal="'modal_' + group.id">Create {{ group.label }}</b-button>
              <!-- <b-button @click="createAddonInstance(group)">Create {{ group.label }}</b-button> -->

              <!-- View existing instance data -->
              <hr>

              <ul class='list-group'>
                <li
                  class="list-group-item d-flex justify-content-between align-items-center"
                  v-for="instance in configurationObject[group.identifier_plural][selectedSchemaId]"
                  :key="instance.id"
                >

                  <OptionTemplateRenderer
                    v-if="group.previewTemplate"
                    :model="instance"
                    :schema="selectedSchema"
                    :template="group.previewTemplate"
                  >
                  </OptionTemplateRenderer>

                  <template v-else>
                    {{ group.attributes[0].label }}:{{ instance[group.attributes[0].identifier] }}
                  </template>

                  <span>
                    <b-button @click="editInstance(group, instance)" size="sm" variant="outline-warning">
                      <i class="fa fa-edit"></i>
                    </b-button>
                    <b-button @click="destroyInstance(group, instance)" size="sm" variant="outline-danger">
                      <i class="fa fa-trash"></i>
                    </b-button>
                  </span>

                </li>
                <li
                  class="list-group-item list-group-item-warning"
                  v-if="!configurationObject[group.identifier_plural][selectedSchemaId][0]"
                >
                  No addons available
                </li>
              </ul>

            </b-card>
          </b-col>
        </b-row>

        <div class="card card-body text-center bg-transparent border-warning text-warning" v-if="!group.attributes[0]">
          <p class="lead mb-0">No options exposed by this generator</p>
        </div>
      </template>

      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <template v-if="group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION'">
        <b-row>
          <b-col lg=3 class='border-right'>
            <div class="card">
              <div class="card-header">
                <strong>Models</strong>
              </div>
              <ul class="list-group list-group-flush">
                <li
                  v-for="schema in schemas"
                  :class='selectedSchemaId === schema.identifier ? "list-group-item active" : "list-group-item" '
                  @click="selectedSchemaId = schema.identifier"
                >
                  {{ schema.label }}
                </li>
              </ul>
            </div>
          </b-col>
          <b-col lg=9>

            <!-- Header - "User MODEL OPTIONS" -->
            <p class="lead mb-0">
              {{ selectedSchema.label }} {{ group.label_plural }}
            </p>

            <!-- Header - Description -->
            <small class="text-muted">{{group.description}}</small>


            <!-- Define new instance -->
            <div class="card card-body mt-2" v-for="attr in group.attributes">
              <OptionFormItem
                :schema="selectedSchema"
                :group="group"
                :model="attr"
                v-model="configurationObject[group.identifier_plural][selectedSchemaId][attr.identifier]"
              />
            </div>

          </b-col>
        </b-row>

        <div class="card card-body text-center bg-transparent border-warning text-warning" v-if="!group.attributes[0]">
          <p class="lead mb-0">No options exposed by this generator</p>
        </div>
      </template>

      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <!-- TODO - ABSTRACT INTO SEPARATE COMPONENT -->
      <template v-if="group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION'">
        <b-row class='justify-content-center'>
          <b-col lg=9>

            <!-- Header - Description -->
            <!-- <small class="text-muted">{{group.description}}</small> -->

            <!-- Define new instance -->
            <div class="card card-body mt-2" v-for="attr in group.attributes">
              <OptionFormItem
                :group="group"
                :model="attr"
              />
            </div>

          </b-col>
        </b-row>

        <div class="card card-body text-center bg-transparent border-warning text-warning" v-if="!group.attributes[0]">
          <p class="lead mb-0">No options exposed by this generator</p>
        </div>
      </template>

    </b-tab>

  </b-tabs>
</template>

<script>
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'
import buildConfiguration from '@codotype/util/lib/buildConfiguration'
import OptionFormItem from '../../option/components/OptionFormItem'
import OptionTemplateRenderer from '../../option/components/OptionTemplateRenderer'

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
