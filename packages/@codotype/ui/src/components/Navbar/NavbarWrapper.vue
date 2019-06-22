<template>
  <b-navbar toggleable="md" type="light" variant="light" class="bg-white">
    <div class="container">
      <slot name="brand"></slot>
      <b-navbar-toggle target="nav_collapse" />
      <b-collapse id="nav_collapse" is-nav>
        <slot name="links"></slot>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
.navbar {
  font-family: $heading-font;
  transition: all 0.3s ease;
  padding: 0.4rem;
  background: #ffffff !important;
  box-shadow: 0px 9px 68px 0px rgba(62, 57, 107, 0.1);
  // border-bottom: 1px solid rgba( $white, .2);
  // border-bottom: 1px solid #d3d3d3;
  // padding: 1rem !important;
}
</style>
