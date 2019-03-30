<template>
  <b-navbar toggleable="md" type="light" variant="light" fixed="top">
    <b-navbar-brand to="/">
      <strong>Codotype</strong>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-collapse is-nav id="nav_collapse">

      <!-- Navbar Links -->
      <b-navbar-nav class="mr-auto">

        <!-- Public links -->
        <b-nav-item to="/generators">Generators</b-nav-item>

        <!-- <b-nav-item to="/blueprints">Blueprints</b-nav-item> -->

      </b-navbar-nav>

    </b-collapse>

  </b-navbar>

</template>

<script>
export default {
  name: 'HomeMenu'
}
</script>
