<template>
  <small class="d-flex flex-row align-items-center text-muted">
    <font-awesome-icon v-if="svg" :icon="['fab', 'github']" class="mr-1" />
    <i class="fab fa-github mr-1" v-else />
    <a class='text-muted' target="_blank" :href="'https://github.com/' + model.github_url">
      {{ model.github_url.split('/')[0] }}
    </a>
  </small>
</template>

<script>
export default {
  props: {
    model: {
      required: true
    },
    svg: {
      required: false
    }
  }
}
</script>

