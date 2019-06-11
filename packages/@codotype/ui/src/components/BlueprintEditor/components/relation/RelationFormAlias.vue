<template>
  <b-row class="row d-flex flex-row align-items-center">
    <div class="col-lg-12">
      <div class="row d-flex justify-content-between">
        <!-- Alias inputs -->
        <div class="col-lg-4">
          <div class="form-group">
            <label class='mb-0'>Alias</label>
            <small class="form-text text-muted">Alias this relation under a different singlar, title-cased noun</small>
            <input type="text" class='form-control' v-model="model.as" @input="updateNewModel()">
          </div>
        </div>

        <!-- Alias Help -->
        <div class="col-lg-4">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group mb-2 text-center">
                <label class='mb-0'>Alias</label>
                <small class="form-text text-muted mb-0">Reference associated models by a different name</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="form-group text-right">
            <label class='mb-0'>
              <i
                class="fa fa-question-circle"
                v-b-tooltip.hover.right
                title="NOTE - only available with 'Belongs To' relations"
              ></i>
              Reverse Alias
            </label>
            <!-- help="The singlar, title-cased noun that describes your model" -->
            <!-- example="Example: 'User Role' or 'Blog Post'" -->
            <small class="form-text text-muted">Alias the reverse reference under a singular, title-cased noun</small>
            <input type="text" class='form-control' :disabled="model.type !== 'BELONGS_TO'" v-model="model.reverse_as" @input="updateNewModel()">
          </div>
        </div>
      </div>
    </div>
  </b-row>
</template>

<script>
export default {
  props: {
    model: {
      required: true
    }
  },
  methods: {
    updateNewModel () { // CLEANUP - abstract this into a Vue mixin?
      this.$store.commit('editor/schema/relation/collection/newModel', this.model)
    }
  }
}
</script>
