<template>
  <div class="row d-flex flex-row align-items-center">
    <div class="col-lg-12">
      <span v-if="slim && sourceLabel !== sourceAlias" v-b-tooltip.hover.left :title='`as "${sourceAlias}"`'>
        <i class="fa fa-mask text-primary mr-1" />
      </span>
      <span v-else-if="sourceLabel !== sourceAlias" class="text-primary">(as <i>{{ sourceAlias }}) </i></span>

      <span class='text-primary'>{{ sourceManyOrOne }} <strong>{{ sourceLabel }}</strong><i :class="iconCss"></i></span><span class="text-info">{{ destManyOrOne }} <strong>{{ destLabel }}</strong></span>

      <span v-if="slim && destLabel !== destAlias" v-b-tooltip.hover.right :title='`as "${destAlias}"`'>
        <i class="fa fa-mask text-info ml-1" />
      </span>
      <span v-else-if="destLabel !== destAlias" class="text-info"> (as <i>{{ destAlias }})</i></span>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: {
    direction: {
      required: true,
      type: String
    },
    sourcePlural: {
      required: true,
      type: Boolean,
      default: false
    },
    sourceLabel: {
      required: true,
      type: String
    },
    sourceAlias: {
      required: true,
      type: String
    },
    destPlural: {
      required: true,
      type: Boolean,
      default: false
    },
    destLabel: {
      required: true,
      type: String
    },
    destAlias: {
      required: true,
      type: String
    },
    slim: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  computed: {
    sourceManyOrOne() {
      if (this.sourcePlural) return 'Many'
      return 'One'
    },
    destManyOrOne() {
      if (this.destPlural) return 'Many'
      return 'One'
    },
    iconCss() {
      const css = ['fa', 'fa-fw', 'mx-1']
      if (this.direction === 'out') {
        css.push('fa-arrow-right')
        css.push('text-primary')
      } else {
        css.push('fa-arrow-left')
        css.push('text-info')
      }
      return css.join(' ')
    }
  }
}
</script>
