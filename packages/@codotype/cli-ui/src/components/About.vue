<template>
  <div class="row h-100 align-items-center">
    <div class="col-lg-12">

      <div class="row mt-2">
        <div class="col-lg-12 text-center">
          <h1 class='display-1' style="letter-spacing: .25rem !important;">Codotype</h1>
        </div>
      </div>

      <!-- <b-nav-item href="mailto:codotype.io@gmail.com"> -->
        <!-- <i class="far fa-lg fa-fw fa-envelope text-success mr-1"></i> -->
        <!-- Email -->
      <!-- </b-nav-item> -->

      <div class="row">

        <div class="col-lg-12 text-center">
          <p class="lead">visual code scaffolding for the modern web</p>
          <p>Prototype new web applications amazingly fast</p>
          <p>Define your models, attributes, and relations - Codotype does the rest</p>
        </div>

        <div class="col-lg-12 d-flex justify-content-center">
          <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star>
        </div>

        <div class="col-lg-12 d-flex justify-content-center">
          <p class="lead mb-0 mt-4">
            <span>Built with </span><i class="fa fa-heart text-danger"></i><span class='px-1'>by</span><a href="https://github.com/aeksco" target='_blank'>@aeksco</a>
          </p>
        </div>

        <div class="col-lg-12 d-flex justify-content-center">
          <gh-btns-follow class='mt-3' user="aeksco" show-count></gh-btns-follow>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  metaInfo: {
    title: 'About'
  }
}
</script>
