<template>
  <div class="row h-100 align-items-center">

    <div class="col-lg-12">

      <div class="row">
        <div class="col-lg-12 text-center">
          <img style="max-width: 4rem !important;" :src="model.icon"/>
          <h3 class='display-4'>{{model.label}}</h3>
          <p class="lead text-muted">powered by <a target="_blank" href="https://codotype.org">Codotype</a></p>
        </div>

        <div class="col-lg-12 d-flex justify-content-center">
          <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star>
        </div>
      </div>

      <div class="row mt-3">

        <div class="col-lg-12 text-center">

          <p class="lead">{{model.description}}</p>
        </div>

      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4 text-center">
          <b-btn
            v-if="buildLink"
            block
            :to="buildLink"
            size="lg"
            variant="primary"
          >
            <i class="fa fa-cog fa-spin"></i>
            Let's build something
          </b-btn>

          <b-btn
            v-if="externalLink"
            block
            :href="externalLink"
            size="lg"
            variant="primary"
          >
            <i class="fa fa-cog fa-spin"></i>
            Let's build something
          </b-btn>
        </div>
      </div>

      <div class="row justify-content-center mt-3">
        <div class="col-lg-12 d-flex justify-content-center align-items-center">
          <GeneratorTechTag v-for="tag in model.tech_tags" :key="tag" :tag="tag" />
        </div>

        <div class="col-lg-12 d-flex justify-content-center align-items-center mt-2">
          <GeneratorTypeTag v-for="tag in model.type_tags" :key="tag" :tag="tag" />
          <GeneratorVersionTag :model="model" />
          <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import GeneratorTypeTag from './GeneratorTypeTag'
import GeneratorTechTag from './GeneratorTechTag'
import GeneratorVersionTag from './GeneratorVersionTag'

export default {
  props: {
    model: {
      required: true
    },
    buildLink: {
      type: String
    },
    externalLink: {
      type: String
    }
  },
  components: {
    GeneratorTypeTag,
    GeneratorTechTag,
    GeneratorVersionTag
  }
}
</script>
