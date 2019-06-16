<template>
  <b-navbar toggleable="md" type="light" variant="light" class="bg-white" fixed="top">
    <div class="container">
      <div class="d-flex flew-row align-items-center">
        <img
          src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
          style="margin-right: .5rem; margin-top: 0.25rem; height: 1.5rem; width: 1.5rem; float: left;"
          alt="Codotype Logo"
        />
        <b-navbar-brand to="/">
          <h3 class="gradient-mask mb-0">codotype</h3>
        </b-navbar-brand>
      </div>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse id="nav_collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <!-- <img class='generator-icon ml-3 mr-1' style="width: 1rem;" :src="selectedModel.icon"/> -->
          <span>{{ selectedModel.label }}</span>
          <!-- <b-nav-item to="/generators">Generators</b-nav-item> -->
        </b-navbar-nav>

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
    </div>
  </b-navbar>
</template>

<script>
import GeneratorFetchMixin from './GeneratorFetchMixin'

export default {
  name: 'Navbar',
  mixins: [GeneratorFetchMixin]
}
</script>

<style lang="sass">
@import "@codotype/ui/src/sass/vendor.sass"

// nav.navbar
//   border-bottom: 1px solid #d3d3d3

.gradient-mask
  // -webkit-text-fill-color: transparent;
  // -webkit-background-clip: text;
  // background-clip: text;
  // background-image: -webkit-gradient(linear, left top, right top, from($brand-primary), to($brand-secondary));
  color: #555555;


.navbar
  font-family: $heading-font;
  transition: all 0.3s ease
  padding: 0.4rem
  background: #ffffff !important
  box-shadow: 0px 9px 68px 0px rgba(62, 57, 107, 0.1)
  // border-bottom: 1px solid rgba( $white, .2);
  // border-bottom: 1px solid #d3d3d3;
  // padding: 1rem !important;

.nav-link
  font-size: 16px

</style>
