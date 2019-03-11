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
          <!-- <gh-btns-follow class='mt-3' user="aeksco" show-count></gh-btns-follow> -->
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
            block
            to="/build"
            size="lg"
            variant="primary"
          >
            <i class="fa fa-cog fa-spin"></i>
            Let's build something
          </b-btn>
        </div>
      </div>

    </div>

      <!-- <div class="row justify-content-center" v-if="false">
        <div class="col-lg-6 d-flex justify-content-between align-items-center">

          <span class="d-flex">
            <GeneratorTypeTag v-for="tag in model.type_tags" :key="tag" :tag="tag" />
            <GeneratorTechTag v-for="tag in model.tech_tags" :key="tag" :tag="tag" />
            <GeneratorVersionTag :model="model" />
            <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span>
          </span>

        </div>
      </div> -->

      <!-- <div class="row mt-4 mb-4 justify-content-center" v-if="false">
        <div class="col-lg-12">
          <div class='card-header bg-dark text-light'>README.md</div>
          <div class="card-body bg-white" v-html="compiledMarkdown"></div>
        </div>
      </div> -->

      <!-- <pre class="bg-dark text-light">{{model}}</pre> -->

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
