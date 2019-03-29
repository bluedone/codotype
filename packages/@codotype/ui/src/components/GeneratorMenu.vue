<template>
  <b-navbar toggleable="md" type="light" variant="light" fixed="top">
    <b-navbar-brand to="/generators">
      <strong>Codotype</strong>
    </b-navbar-brand>

    <router-link :to="'/generators/' + model.id" class="navbar-text">
      <img class='generator-icon' style="width: 1rem;" :src="model.icon"/>
      {{ model.label }}
    </router-link>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">


      <b-navbar-nav class="ml-auto">

        <b-navbar-nav>
          <b-nav-item class='ml-3' to="/about/">About</b-nav-item>
        </b-navbar-nav>

        <b-nav-item target="_blank" href="https://twitter.com/codotype">
          <i class="fab fa-lg fa-fw fa-twitter text-primary mr-1"></i>
        </b-nav-item>

        <b-nav-item target="_blank" href="https://github.com/codotype">
          <i class="fab fa-lg fa-fw fa-github text-dark mr-1"></i>
        </b-nav-item>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TourButton from './TourButton'

export default {
  name: 'BlueprintMenu',
  components: {
    TourButton
  },
  computed: mapGetters({
    model: 'generator/selectedModel'
  }),
  methods: mapActions({
    generateCodebase: 'build/generate'
  })
}
</script>
