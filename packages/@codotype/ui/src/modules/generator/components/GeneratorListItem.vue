<template>
  <div class="card card-body border-light shadow-hover mb-2">
    <div class="row">
      <div class="col-lg-12 d-flex justify-content-between align-items-center">
        <p class="lead mb-0 w-100 d-flex justify-content-between align-items-center">

          <router-link :to="'/generators/' + model.id + '/build'">
            <img class='generator-icon' :src="model.icon"/>
            {{ model.label }}
          </router-link>

          <GeneratorGitHubLink class='ml-2' :model="model" />
          <!-- <span class='badge badge-light text-muted'>{{ model.version }}</span> -->
          <!-- <span class='badge badge-warning' v-if="model.official">Official</span> -->
        </p>

      </div>
      <div class="col-lg-12">
        <p class="card-text mb-2">
          {{ model.description }}
        </p>
      </div>
      <div class="col-lg-12 d-flex justify-content-between align-items-center">

        <span class="d-flex">
          <GeneratorTypeTag v-for="tag in model.type_tags" :key="tag" :tag="tag" />
          <GeneratorTechTag v-for="tag in model.tech_tags" :key="tag" :tag="tag" />
          <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span>
        </span>

        <span class="d-flex">
          <GeneratorExperienceTag :model="model" v-if="model.experience" />
          <GeneratorVersionTag :model="model" />
        </span>

      </div>
    </div>
  </div>
</template>

<script>
import GeneratorTypeTag from './GeneratorTypeTag'
import GeneratorTechTag from './GeneratorTechTag'
import GeneratorVersionTag from './GeneratorVersionTag'
import GeneratorExperienceTag from './GeneratorExperienceTag'
import GeneratorGitHubLink from './GeneratorGitHubLink'

export default {
  name: 'GeneratorListItem',
  props: {
    model: {
      required: true
    }
  },
  components: {
    GeneratorTypeTag,
    GeneratorTechTag,
    GeneratorVersionTag,
    GeneratorExperienceTag,
    GeneratorGitHubLink
  }
}
</script>

<style type="text/css" scoped>
  .generator-icon {
    max-width: 2rem;
  }
</style>
