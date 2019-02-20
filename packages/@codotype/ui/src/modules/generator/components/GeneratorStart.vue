<template>
  <div class="row mt-5">
    <div class="col-lg-12">
      <div class="row">
        <div class="col-lg-12 text-center">
          <img class='generator-icon' :src="model.icon"/>
          <h2>{{model.label}}</h2>
        </div>
      </div>

      <div class="row py-2">

        <div class="col-lg-12 text-center">
          <p class="lead">{{model.description}}</p>
        </div>

        <div class="col-lg-12 text-center d-flex align-items-center justify-content-center">
          <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-6 text-center">
          <hr class='mt-2 mb-4'>
          <b-btn
            class='mb-4'
            block
            to="/build"
            size="lg"
            variant="primary"
          >
            Start
          </b-btn>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-6 d-flex justify-content-between align-items-center">

          <!-- TODO - break out into a distinct component -->
          <span class="d-flex">
            <GeneratorTypeTag v-for="tag in model.type_tags" :key="tag" :tag="tag" />
            <GeneratorTechTag v-for="tag in model.tech_tags" :key="tag" :tag="tag" />
            <GeneratorVersionTag :model="model" />
            <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span>
          </span>

        </div>
      </div>

      <div class="row mt-4 mb-4 justify-content-center">
        <div class="col-lg-12">
          <div class='card-header bg-dark text-light'>README.md</div>
          <div class="card-body bg-white" v-html="compiledMarkdown"></div>
          <!-- <pre class="bg-dark text-light">{{model}}</pre> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import marked from 'marked'
import GeneratorTypeTag from './GeneratorTypeTag'
import GeneratorTechTag from './GeneratorTechTag'
import GeneratorVersionTag from './GeneratorVersionTag'

export default {
  props: {
    model: {
      required: true
    }
  },
  components: {
    GeneratorTypeTag,
    GeneratorTechTag,
    GeneratorVersionTag
  },
  computed: {
    compiledMarkdown () {
      return marked(this.model.readme, { sanitize: true })
    }
  }
}
</script>
