<template>
  <NavbarWrapper fixed>
    <template slot="brand">
      <NavbarBrand url="/" />
    </template>

    <template slot="links">
      <b-navbar-nav class="mr-auto">
        <span>{{ selectedModel.label }}</span>
      </b-navbar-nav>
      <NavbarLinks />
    </template>
  </NavbarWrapper>
</template>

<script>
import NavbarWrapper from '@codotype/ui/src/components/Navbar/NavbarWrapper'
import NavbarBrand from '@codotype/ui/src/components/Navbar/NavbarBrand'
import NavbarLinks from '@codotype/ui/src/components/Navbar/NavbarLinks'
import GeneratorFetchMixin from './GeneratorFetchMixin'

export default {
  name: 'Navbar',
  mixins: [GeneratorFetchMixin],
  components: {
    NavbarWrapper,
    NavbarLinks,
    NavbarBrand
  }
}
</script>
