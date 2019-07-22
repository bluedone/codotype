<template>
  <div class="row">
    <div class="col-lg-12 d-flex justify-content-center">
      <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star>
    </div>

    <div class="col-lg-12 d-flex justify-content-center">
      <p class="lead mb-0 mt-4">
        <span>Built with </span><font-awesome-icon v-if="svg" icon="heart" class="text-danger" /><i v-else class="fa fa-heart text-danger" /><span class='px-1'>by</span><a href="https://github.com/aeksco" target='_blank'>@aeksco</a>
      </p>
    </div>

    <div class="col-lg-12 d-flex justify-content-center">
      <gh-btns-follow class='mt-3' user="aeksco" show-count></gh-btns-follow>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutAttribution',
  props: {
    svg: {
      type: Boolean,
      required: false
    }
  }
}
</script>
