<template>
  <div class="h-100 d-flex flex-row justify-content-center align-items-center">
    <div class="col-lg-8">
      <div class="card card-body text-center shadow-sm">
        <p class="title"><strong>Codotype</strong> is generating your codebase</p>
        <small class="text-muted">
          This should only take a few moments
          <i class="far fa-laugh" />
        </small>
        <div class="row my-4">
          <div class="col-lg-12 text-center d-flex justify-content-center">
            <Circle8 size="80px" class='d-flex my-2'/>
          </div>
        </div>
        <small class="text-muted">
          I have no patience with dinosaurs.
          <br>
          - <strong>Adam West</strong>
        </small>
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

<style scoped>
  p.title {
    font-size: 1.25rem;
  }
</style>
