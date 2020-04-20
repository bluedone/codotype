<template>
  <b-navbar toggleable="md" type="light" variant="light" :fixed="fixed ? 'top': null" class="bg-white">
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
  name: 'NavbarWrapper',
  props: {
    fixed: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="sass">
@import '../../sass/vendor.sass'
.navbar
  font-family: $heading-font
  padding: 0.4rem
  background: #ffffff !important
  box-shadow: 0px 9px 68px 0px rgba(62, 57, 107, 0.1)
</style>
