<template>
  <b-row class="h-100 align-items-center">
    <b-col lg="12">

      <b-row>
        <b-col lg="12" class="text-center">
          <img style="max-width: 4rem !important;" :src="model.icon"/>
          <h3 class='display-4'>{{model.label}}</h3>
          <p class="lead text-muted">powered by <a target="_blank" href="https://codotype.org">Codotype</a></p>
        </b-col>

        <b-col lg="12" class="d-flex justify-content-center">
          <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col class="text-center">
          <p class="lead">{{model.description}}</p>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col lg="4" md="6" sm="8" class="text-center">
          <b-btn
            v-if="buildLink"
            block
            :to="buildLink"
            size="lg"
            class="rounded-pill"
            variant="primary"
          >
            Let's build something
            <ChevronAnimation active :svg="svg" />
          </b-btn>

          <b-btn
            v-if="externalLink"
            block
            :href="externalLink"
            size="lg"
            class="rounded-pill"
            variant="primary"
          >
            Let's build something
            <ChevronAnimation active :svg="svg" />
          </b-btn>
        </b-col>
      </b-row>

      <b-row class="row justify-content-center mt-3">
        <b-col lg="12" class="d-flex justify-content-center align-items-center">
          <GeneratorTechTag v-for="tag in model.tech_tags" :key="tag" :tag="tag" />
        </b-col>

        <b-col lg="12" class="d-flex justify-content-center align-items-center mt-2">
          <GeneratorTypeTag v-for="tag in model.type_tags" :key="tag" :tag="tag" />
          <GeneratorVersionTag :model="model" />
          <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span>
        </b-col>
      </b-row>

    </b-col>
  </b-row>
</template>

<script>
import GeneratorTypeTag from './GeneratorTypeTag'
import GeneratorTechTag from './GeneratorTechTag'
import GeneratorVersionTag from './GeneratorVersionTag'
import ChevronAnimation from '../../../components/ChevronAnimation'

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
    },
    svg: {
      type: Boolean
    }
  },
  components: {
    GeneratorTypeTag,
    GeneratorTechTag,
    GeneratorVersionTag,
    ChevronAnimation
  }
}
</script>
