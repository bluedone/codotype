<template>
  <small>
    <a class='text-muted' target="_blank" :href="'https://github.com/' + model.github_url">
      <i class="fab fa-github"></i>
      {{ model.github_url.split('/')[0] }}
    </a>
  </small>
</template>

<script>
export default {
  props: {
    model: {
      required: true
    }
  }
}
</script>

