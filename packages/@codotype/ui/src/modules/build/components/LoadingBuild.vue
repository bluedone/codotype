<template>
  <div class="h-100 d-flex flex-row align-items-center">
    <div class="col-lg-8">
      <div class="card card-body text-center" v-if="buildLoading">
        <p class="lead">Thousands of monkeys are generating your app</p>
        <small class="text-muted">please be nice to them its their first day on the job</small>
        <div class="row mt-4">
          <div class="col-lg-12 text-center d-flex justify-content-center">
            <Circle8 size="80px" class='d-flex my-2'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Circle8 from 'vue-loading-spinner/src/components/Circle8'

export default {
  name: 'LoadingBuild',
  props: ['model'],
  components: {
    Circle8
  },
  computed: mapGetters({
    buildLoading: 'build/runtime/loading',
  })
}
</script>
