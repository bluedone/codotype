<template>
  <b-row>
    <b-col lg='12'>
      <span class='d-flex align-items-center'>
        <p class="lead mb-0 mr-3">{{ title }}</p>
        <br class='d-none d-sm-block d-md-none'>
        <MoreInfoLink :url="url"/>
        <small class="ml-2 text-muted">{{ help }}</small>
      </span>
    </b-col>
  </b-row>
</template>

<!-- // // // //  -->

<script>
import MoreInfoLink from './MoreInfoLink'

export default {
  props: ['title', 'help', 'url'],
  components: {
    MoreInfoLink
  }
}
</script>


