<template>
  <b-row class="row d-flex flex-row align-items-center">
    <div class="col-lg-12">
      <div class="row d-flex flex-row align-items-center justify-content-between">
        <!-- Alias inputs -->
        <div class="col-lg-4">
          <p>{{model.type}}</p>
          <RelationFormPreview :model="model" />
        </div>

        <div class="col-lg-4">
          <div class="form-group">
            <label class='mb-0'>
              <i
                class="fa fa-question-circle"
                v-b-tooltip.hover.left
                title="NOTE - only available with 'Belongs To' relations"
              />
              Reverse Alias
            </label>
            <!-- help="The singlar, title-cased noun that describes your model" -->
            <!-- example="Example: 'User Role' or 'Blog Post'" -->
            <small class="form-text text-muted">Alias of the reverse relation</small>
            <input
              type="text"
              class='form-control border-primary text-primary'
              :placeholder="selectedSchema.label"
              :disabled="model.type !== 'BELONGS_TO'"
              v-model="model.reverse_as"
              @input="updateNewModel()"
            />
          </div>
        </div>

        <!-- Alias Help -->
        <div class="col-lg-4">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <label class='mb-0'>Alias</label>
                <small class="form-text text-muted">Alias of the target schema</small>
                <input
                  type="text"
                  class='form-control border-info text-info'
                  v-model="model.as"
                  :placeholder="selectedRelatedSchema.label"
                  @input="updateNewModel()"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import RelationFormPreview from './RelationFormPreview'
export default {
  props: {
    model: {
      required: true
    }
  },
  components: {
    RelationFormPreview
  },
  methods: {
    updateNewModel () { // CLEANUP - abstract this into a Vue mixin?
      this.$store.commit('editor/schema/relation/collection/newModel', this.model)
    }
  },
  computed: {
    ...mapGetters({
      allSchemas: 'editor/schema/collection/items',
      selectedSchema: 'editor/schema/selectedModel'
    }),
    selectedRelatedSchema () {
      return this.allSchemas.find(m => m.id === this.model.related_schema_id)
    }
  }
}
</script>
