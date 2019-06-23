<template>
  <b-navbar-nav class="ml-auto">
    <b-nav-item href="https://codotype.io/about">
      <font-awesome-icon v-if="svgs" icon="question-circle" class="mr-1" />
      <i v-else class="fa fa-fw fa-question-circle mt-1" />
      About
    </b-nav-item>

    <b-nav-item href="https://codotype.org" target="_blank">
      <font-awesome-icon v-if="svgs" icon="book" class="text-info mr-1" />
      <i v-else class="fa fa-fw fa-book mt-1 text-info" />
      Docs
    </b-nav-item>

     <!-- <b-nav-item to="https://codotype.org" target="_blank"> -->
      <!-- <font-awesome-icon v-if="svgs" icon="dollar-sign" class="text-success" /> -->
      <!-- <i v-else class="fa fa-fw fa-dollar-sign mt-1 text-success" /> -->
      <!-- Donate -->
    <!-- </b-nav-item> -->

    <b-nav-item target="_blank" href="https://twitter.com/codotype">
      <font-awesome-icon
        v-if="svgs"
        :icon="['fab', 'twitter']"
        class="text-primary mr-1"
      />
      <i v-else class="fab fa-fw fa-twitter mt-1 text-primary" />
      Twitter
    </b-nav-item>

    <b-nav-item target="_blank" href="https://github.com/codotype">
      <font-awesome-icon v-if="svgs" :icon="['fab', 'github']" class="mr-1" />
      <i v-else class="fab fa-fw fa-github mt-1" />
      GitHub
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
export default {
  name: 'NavbarLinks',
  props: {
    svgs: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.nav-link {
  font-size: 16px;
}
</style>
