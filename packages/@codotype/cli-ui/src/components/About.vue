<template>
  <div class="row h-100 align-items-center">
    <div class="col-lg-12">
      <AboutJumbotron />
      <AboutBody />
      <AboutAttribution />
    </div>
  </div>
</template>

<script>
import AboutJumbotron from '@codotype/ui/src/components/About/AboutJumbotron'
import AboutBody from '@codotype/ui/src/components/About/AboutBody'
import AboutAttribution from '@codotype/ui/src/components/About/AboutAttribution'
export default {
  name: 'About',
  metaInfo: {
    title: 'About'
  },
  components: {
    AboutJumbotron,
    AboutBody,
    AboutAttribution
  }
}
</script>
