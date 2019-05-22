<template>
  <div class="row h-100 align-items-center">
    <div class="col-lg-12">

      <div class="row mt-2">
        <div class="col-lg-12 text-center">
          <h4 class='display-4'>Oops, something went wrong.</h4>
        </div>
      </div>

      <div class="row">

        <div class="col-lg-12 text-center">
          <p class="lead">
            <i class="far fa-3x fa-frown"></i>
          </p>
        </div>

        <div class="col-lg-12 text-center">
          <p class="lead">It was probably our fault - we're sorry about that.</p>
        </div>

        <div class="col-lg-12 text-center" v-if="homeUrl">
          <p class="lead"><a :href="homeUrl">Click here to return home</a></p>
        </div>

        <div class="col-lg-12 text-center" v-if="redirectUrl">
          <p class="lead">We'll be redirecting you momentarily</p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  metaInfo: {
    title: 'Page Not Found'
  },
  props: {
    homeUrl: {
      type: String,
      required: true
    }
  }
}
</script>
