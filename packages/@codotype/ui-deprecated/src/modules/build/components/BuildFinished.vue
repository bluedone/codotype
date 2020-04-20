<template>
  <div class="row d-flex align-items-center h-100 justify-content-center">
    <div class="col-lg-8">
      <div class="card card-body shadow-sm">

        <!-- Header -->
        <div class="row">
          <div class="col-lg-12 text-center">

            <p class="lead mb-1">
              Thank you for using <strong style="font-weight:700;">Codotype</strong>
            </p>
            <p class="lead mb-1">
              <i class="fa fa-lg fa-heart text-danger" />
            </p>

            <small class="text-muted">Your <span class="text-success">Project</span> has successfully been generated</small>
            <br>
            <small class="text-muted mt-3">Download and unzip the codebase and follow the instructions in <strong>README.md</strong></small>
          </div>
        </div>

        <!-- Local Generator -->
        <div class="row d-flex justify-content-center mt-3" v-if="filepath && responseType === 'LOCAL_PATH'">
          <div class="col-sm-12 text-center">
            <small class="text-primary">
              Your codebase is in the following local directory:
            </small>
            <p class="lead mb-0">
              <b-button
                size="sm"
                variant="dark"
                v-b-tooltip.hover.bottom="'Copy to clipboard'"
                v-clipboard:copy="filepath"
              >
                {{ filepath }}
              </b-button>
            </p>
          </div>
        </div>

        <!-- S3 Zip Download -->
        <div class="row d-flex justify-content-center mt-3" v-if="downloadUrl && responseType === 'S3_DOWNLOAD'">
          <div class="col-lg-6">
            <b-btn
              variant="success"
              block
              size="lg"
              :href="downloadUrl"
              target="_blank"
            >
              <i class="fa fa-fw fa-download" />
              Download ZIP
            </b-btn>
          </div>
        </div>

        <div class="row d-flex justify-content-center mt-3">
          <div class="col-sm-12 text-center">

            <p class="mb-1">
              <i class="far fa-lightbulb" />
              Remember, iteration is key
            </p>

            <small class="text-muted">
              Make changes and <strong>re-generate</strong> your Project as many times as you like <i class="far fa-laugh" />
            </small>
          </div>

          <div class="col-sm-12 col-md-4 mt-2">
            <b-btn
              block
              variant="outline-primary"
              @click="$store.dispatch('build/runtime/reset')"
            >
              <i class="fa fa-fw fa-reply" />
              Back to Editor
            </b-btn>

          </div>
        </div>

        <hr>

        <div class="row d-flex justify-content-center">
          <div class="col-lg-12 text-center">

            <p class='mb-0'>Support Codotype</p>
            <small class="text-muted">
              Give us a <i class="fa fa-fw text-warning fa-star" /> on <a href="https://github.com/codotype/codotype" target='_blank'>GitHub</a> or follow us on <a href="https://twitter.com/codotype" target='_blank'><i class="fab fa-fw fa-twitter" />Twitter</a>
            </small>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BuildFinished',
  computed: mapGetters({
    responseType: 'build/runtime/responseType',
    downloadUrl: 'build/runtime/downloadUrl',
    filepath: 'build/runtime/filepath'
  })
}
</script>
