<template>
  <b-row>

    <!-- CLEANUP - this schema selector should be a different component -->
    <b-col lg=3>
      <div class="text-muted mb-2">
        <strong>
          <i class="fa fa-database mr-1" />
          Schemas
        </strong>
      </div>
      <div class="card">
        <ul class='list-group list-group-flush'>
          <li
            v-for="schema in schemas"
            :class='selectedSchema.id === schema.id ? "list-group-item list-group-item-action list-group-item-primary" : "list-group-item list-group-item-action" '
            @click="$store.dispatch('build/editor/selectModelAddon', { group: group, schema: schema })"
          >
            {{ schema.label }}
          </li>
        </ul>
      </div>
    </b-col>

    <b-col lg=9 class='pl-0'>
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
                @click="newInstance()"
              >
                <i class="fa fa-plus" />
                Add {{ group.label }}
              </b-button>
            </span>

          </b-col>
        </b-row>

        <!-- Define new instance -->
        <hr>

        <!-- New Addon Modal -->
        <b-modal
          ref="newModal"
          :title="'New ' + group.label"
          size="lg"
          ok-variant='success'
          ok-title='Create'
          cancel-title='Cancel'
          @ok="createInstance()"
        >
          <small class="text-muted">New {{group.label}}</small>

          <div class="row">
            <div class="col-lg-6" v-for="attr in group.attributes" :key="attr.identifier">
              <div class="form-group">
                <OptionFormItem
                  :group="group"
                  :schema="selectedSchema"
                  :attribute="attr"
                />
              </div>
            </div>
          </div>

          <div class="row mt-4" v-if="group.previewTemplate">
            <div class="col-lg-12">
              <OptionTemplateWrapper
                :model="newAddon"
                :schema="selectedSchema"
                :template="group.previewTemplate"
                :tooltip="group.previewTooltip"
              >
              </OptionTemplateWrapper>
            </div>
          </div>

        </b-modal>

        <!-- EDIT MODAL -->
        <!-- EDIT MODAL -->

        <!-- Edit Addon Modal -->
        <b-modal
          ref="editModal"
          :title="'Edit ' + group.label"
          size="lg"
          ok-variant='success'
          ok-title='Create'
          cancel-title='Cancel'
          @ok="updateInstance()"
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

        <!-- EDIT MODAL -->
        <!-- EDIT MODAL -->

        <!-- Remove Addon Modal -->
        <b-modal
          ref="confirmRemoval"
          :title="'Destroy ' + group.label"
          ok-variant='danger'
          ok-title='DESTROY'
          cancel-title='Cancel'
          @ok="removeInstance()"
        >
          <div class="row">
            <div class="col-lg-12">
              Are you sure you want to destroy this {{ group.label }}?
            </div>
          </div>

        </b-modal>

        <!-- View existing instance data -->
        <draggable
          class='list-group'
          v-model='collection'
          :animation="150"
          :fallbackTolerance="100"
        >
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

            <b-dropdown
              right
              no-caret
              size="sm"
              variant="light"
              toggle-class='rounded px-0 py-0 d-flex'
            >
              <template slot="button-content">
                <i class="fa fa-fw fa-ellipsis-h" />
              </template>

              <b-dropdown-item-button @click="editInstance({ instance })">
                <i class="fas fa-fw fa-pencil-alt" />
                Edit
              </b-dropdown-item-button>

              <b-dropdown-item-button @click="confirmRemoveInstance({ instance })">
                <i class="fa fa-fw fa-trash" />
                Remove
              </b-dropdown-item-button>

            </b-dropdown>

          </li>

          <li
            class="list-group-item list-group-item-warning"
            v-if="!collection[0]"
          >
            No {{ group.label_plural }} defined
          </li>

        </draggable >

      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import OptionFormItem from './OptionFormItem'
import OptionTemplateRenderer from './OptionTemplateRenderer'
import OptionTemplateWrapper from './OptionTemplateWrapper'
import SchemaSelector from './SchemaSelector'

export default {
  name: 'ModelAddonEditor',
  props: {
    group: { required: true }
  },
  components: {
    draggable,
    SchemaSelector,
    OptionTemplateRenderer,
    OptionTemplateWrapper,
    OptionFormItem
  },
  data () {
    return {
      removeInstanceId: ''
    }
  },
  mounted () {
    this.$store.dispatch('build/editor/selectModelAddon', { group: this.group, schema: this.selectedSchema })
  },
  computed: {
    collection: {
      get () {
        return this.$store.getters['build/editor/model_addon/items']
      },
      set (value) {

        // Ensures only truthy values
        value = value.filter(s => !!s)

        // Sets `order` attribute on each item
        value.forEach((s, i) => { s.order = i })

        // Sorts the values by `order` attribute before commiting to the Vuex store
        // value = orderBy(value, ['order'], ['asc'])

        // Commits the sorted list to the store
        this.$store.commit('build/editor/model_addon/items', value)
        this.syncModelAddon({ group: this.group, schema: this.selectedSchema })
      }
    },
    ...mapGetters({
      schemas: 'editor/schema/collection/items',
      selectedSchema: 'build/editor/selectedSchema',
      newAddon: 'build/editor/model_addon/newModel',
    })
  },
  methods: {
    ...mapActions({
      createModel: 'build/editor/model_addon/create',
      updateModel: 'build/editor/model_addon/update',
      removeModel: 'build/editor/model_addon/destroy',
      syncModelAddon: 'build/editor/syncModelAddon'
    }),
    ...mapMutations({
      resetNewModel: 'build/editor/model_addon/resetNewModel',
      setEditModel: 'build/editor/model_addon/editModel'
    }),
    newInstance () {
      this.resetNewModel()
      this.$refs.newModal.show()
    },
    createInstance () {
      this.createModel()
      this.syncModelAddon({ group: this.group, schema: this.selectedSchema })
    },
    editInstance ({ instance }) {
      this.$store.commit('build/editor/model_addon/newModel', instance)
      this.$refs.editModal.show()
    },
    updateInstance () {
      this.setEditModel(this.newAddon)
      this.resetNewModel()
      this.updateModel()
    },
    confirmRemoveInstance ({ instance }) {
      this.removeInstanceId = instance.id
      this.$refs.confirmRemoval.show()
    },
    removeInstance () {
      this.removeModel(this.removeInstanceId)
      this.syncModelAddon({ group: this.group, schema: this.selectedSchema })
      this.removeInstanceId = ''
    }
  }
}
</script>
