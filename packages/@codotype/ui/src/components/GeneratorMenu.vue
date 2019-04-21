<template>
  <b-navbar toggleable="md" type="light" variant="light" fixed="top">
    <b-navbar-brand href="http://localhost:3000">
      <strong>Codotype</strong>
    </b-navbar-brand>

    <a :href="'http://localhost:3000/generators/' + model.id" class="navbar-text">
      <img class='generator-icon' style="width: 1rem;" :src="model.icon"/>
      {{ model.label }}
    </a>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav class="ml-auto">

        <b-nav-item target="_blank" href="http://localhost:3000/about">
          <i class="fa fa-question-circle"></i>
          About
        </b-nav-item>

        <b-nav-item target="_blank" href="https://codotype.org">
          <i class="fa fa-book text-info"></i>
          Docs
        </b-nav-item>

        <b-nav-item target="_blank" href="https://twitter.com/codotype">
          <i class="fab fa-twitter text-primary"></i>
          Twitter
        </b-nav-item>

        <b-nav-item target="_blank" href="https://github.com/codotype">
          <i class="fab fa-github"></i>
          GitHub
        </b-nav-item>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TourButton from './TourButton'

export default {
  name: 'GeneratorMenu',
  components: {
    TourButton
  },
  computed: mapGetters({
    model: 'generator/selectedModel'
  })
}
</script>

<style lang="sass">

  nav.navbar
    border-bottom: 1px solid #d3d3d3

</style>
