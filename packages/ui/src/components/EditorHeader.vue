<template>
  <b-row>
    <b-col lg='12'>
      <template v-if="brs">
        <span class='d-flex align-items-center'>
          <p class="lead mb-0 mr-3">{{ title }}</p>
          <MoreInfoLink :url="url"/>
        </span>
        <small class="text-muted">{{ help }}</small>
      </template>
      <span class='d-flex align-items-center' v-else>
        <p class="lead mb-0 mr-3">{{ title }}</p>
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
  props: ['title', 'help', 'url', 'brs'],
  components: {
    MoreInfoLink
  }
}
</script>


