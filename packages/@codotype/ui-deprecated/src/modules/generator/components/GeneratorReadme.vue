<template>
  <div class="row">
    <div class="col-lg-12">
      <div class='card-header bg-dark text-light'>README.md</div>
      <div class="card-body bg-white" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  props: {
    model: {
      required: true
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.model.readme, { sanitize: true })
    }
  }
}
</script>
