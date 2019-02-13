<template>
  <b-row>

    <!-- TODO - this schema selector should be a different component -->
    <b-col lg=3 class='border-right'>
      <SchemaSelector />
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
          @ok="createAddon(group)"
        >
          <small class="text-muted">New {{group.label}}</small>

          <div class="row">
            <div class="col-lg-6" v-for="attr in group.attributes" :key="attr.identifier">
              <OptionFormItem
                :model="attr"
                :group="group"
                :schema="selectedSchema"
              />
            </div>
          </div>

          <div class="row" v-if="group.previewTemplate">
            Preview
            <div class="col-lg-12">
              {{newAddon}}
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
              <b-button @click="destroyInstance(group, instance)" size="sm" variant="outline-danger">
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
import SchemaSelector from './SchemaSelector'

export default {
  name: 'ModelAddonEditor',
  props: {
    group: { required: true }
  },
  components: {
    SchemaSelector,
    OptionTemplateRenderer,
    OptionFormItem
  },
  computed: mapGetters({
    selectedSchema: 'editor/schema/selectedModel',
    newAddon: 'build/editor/addon/newModel',
    collection: 'build/editor/addon/items'
  }),
  methods: {
    ...mapMutations({
      setNewAddonAttr: 'build/editor/addon/newModelAttr'
    }),
    ...mapActions({
      saveAddon: 'build/editor/addon/create'
    }),
    createAddon () {
      this.saveAddon()
    },
    destroyInstance (group, instance) {
      const filtered = this.configurationObject[group.identifier_plural][this.selectedSchema.id].filter(e => e.id !== instance.id)
      this.configurationObject[group.identifier_plural][this.selectedSchema.id] = filtered
    }
  }
}
</script>
