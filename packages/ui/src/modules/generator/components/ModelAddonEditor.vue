<template>
  <b-row>

    <!-- TODO - this schema selector should be a different component -->
    <b-col lg=3 class='border-right'>
      <div class="card">
        <div class="card-header">
          <strong>Models</strong>
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="schema in schemas"
            :class='selectedSchema.id === schema.id ? "list-group-item list-group-item-primary" : "list-group-item" '
            @click="$store.dispatch('build/editor/selectModelAddon', { group: group, schema: schema })"
          >
            {{ schema.label }}
          </li>
        </ul>
      </div>
    </b-col>

    <b-col lg=9>
      <b-card>

        <b-row>
          <b-col lg=12 class='d-flex justify-content-between align-items-center'>

            <!-- Header - "User API Actions" -->
            <span class='d-flex flex-column'>
              <p class="lead mb-0">
                {{ selectedSchema.label }} {{ group.label_plural }}
              </p>

              <!-- Header - Description -->
              <small class="text-muted">{{group.description}}</small>
            </span>

            <span class='d-flex'>
              <b-button
                variant="primary"
                v-b-modal="'modal_' + group.id"
              >
                <i class="fa fa-plus"></i>
                Add {{ group.label }}
              </b-button>
            </span>

          </b-col>
        </b-row>

        <!-- Define new instance -->
        <hr>

        <!-- Bootstrap Modal Component -->
        <b-modal
          :id="'modal_' + group.id"
          :title="'New ' + group.label"
          size="lg"
          ok-variant='success'
          ok-title='Create'
          cancel-title='Cancel'
          @ok="createAddon(group)"
        >
          <small class="text-muted">New {{group.label}}</small>

          <div class="row">
            <div class="col-lg-6" v-for="attr in group.attributes" :key="attr.identifier">
              <OptionFormItem
                :group="group"
                :schema="selectedSchema"
                :attribute="attr"
              />
            </div>
          </div>

          <div class="row mt-4" v-if="group.previewTemplate">
            <div class="col-lg-12">
              <OptionTemplateWrapper
                :model="newAddon"
                :schema="selectedSchema"
                :template="group.previewTemplate"
              >
              </OptionTemplateWrapper>
            </div>
          </div>

        </b-modal>

        <!-- View existing instance data -->
        <ul class='list-group'>
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="instance in collection"
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
              <b-button @click="destroyInstance({ group, instance })" size="sm" variant="outline-danger">
                <i class="fa fa-trash"></i>
              </b-button>
            </span>

          </li>
          <li
            class="list-group-item list-group-item-warning"
            v-if="!collection[0]"
          >
            No {{ group.label_plural }} defined
          </li>
        </ul>

      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import OptionFormItem from '../../option/components/OptionFormItem'
import OptionTemplateRenderer from '../../option/components/OptionTemplateRenderer'
import OptionTemplateWrapper from '../../option/components/OptionTemplateWrapper'
import SchemaSelector from './SchemaSelector'

export default {
  name: 'ModelAddonEditor',
  props: {
    group: { required: true }
  },
  components: {
    SchemaSelector,
    OptionTemplateRenderer,
    OptionTemplateWrapper,
    OptionFormItem
  },
  mounted () {
    this.$store.dispatch('build/editor/selectModelAddon', { group: this.group, schema: this.selectedSchema })
  },
  computed: mapGetters({
    schemas: 'editor/schema/collection/items',
    selectedSchema: 'build/editor/selectedSchema',
    newAddon: 'build/editor/model_addon/newModel',
    collection: 'build/editor/model_addon/items'
  }),
  methods: {
    ...mapActions({
      saveAddon: 'build/editor/model_addon/create',
      syncModelAddon: 'build/editor/syncModelAddon'
    }),
    createAddon () {
      this.saveAddon()
      this.syncModelAddon({ group: this.group, schema: this.selectedSchema })
    },
    destroyInstance ({ group, instance }) {
      // TODO - reimplement
      console.log(group)
      console.log(instance)
    }
  }
}
</script>
