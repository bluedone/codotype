<template>
  <div class="d-flex flew-row align-items-center">
    <img
      class="navbar-logo"
      src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
      alt="Codotype Logo"
    />
    <b-navbar-brand :to="url">
      <h3 class="gradient-mask mb-0">codotype</h3>
    </b-navbar-brand>
  </div>
</template>

<script>
export default {
  name: 'NavbarBrand',
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
.gradient-mask {
  // -webkit-text-fill-color: transparent;
  // -webkit-background-clip: text;
  // background-clip: text;
  // background-image: -webkit-gradient(linear, left top, right top, from($brand-primary), to($brand-secondary));
  color: #555555;
}

.navbar-logo {
  margin-right: .5rem;
  margin-top: 0.25rem;
  height: 1.5rem;
  width: 1.5rem;
  float: left;
}
</style>
