<template>
  <b-row>

    <b-col lg=12>
      <b-card>

        <b-row>
          <b-col lg=12 class='d-flex justify-content-between align-items-center'>

            <!-- Header - "User API Actions" -->
            <span class='d-flex flex-column'>
              <p class="lead mb-0">
                {{ group.label_plural }}
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
                :attribute="attr"
              />
            </div>
          </div>

          <div class="row mt-4" v-if="group.previewTemplate">
            <div class="col-lg-12">
              <OptionTemplateWrapper
                :model="newAddon"
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
import OptionTemplateWrapper from '../../option/components/OptionTemplateWrapper'

export default {
  name: 'GlobalAddonEditor',
  props: {
    group: { required: true }
  },
  components: {
    OptionTemplateRenderer,
    OptionTemplateWrapper,
    OptionFormItem
  },
  mounted () {
    this.$store.dispatch('build/editor/selectGlobalAddon', { group: this.group })
  },
  computed: mapGetters({
    newAddon: 'build/editor/global_addon/newModel',
    collection: 'build/editor/global_addon/items'
  }),
  methods: {
    ...mapActions({
      saveAddon: 'build/editor/global_addon/create',
      syncGlobalAddon: 'build/editor/syncGlobalAddon',
    }),
    createAddon () {
      this.saveAddon()
      this.syncGlobalAddon({ group: this.group })
    },
    destroyInstance (group, instance) {
      // TODO - reimplement
    }
  }
}
</script>
