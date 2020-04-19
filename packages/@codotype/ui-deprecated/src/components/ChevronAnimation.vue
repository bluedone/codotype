<template>
  <span class="ml-2">
    <font-awesome-icon v-if="svg" icon="chevron-right" :class="svgClassName" />
    <i v-else :class="className" />
  </span>
</template>

<script>
export default {
  name: 'ChevronAnimation',
  props: {
    svg: {
      type: Boolean,
      required: false
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    className() {
      const css = ['fa', 'fa-chevron-right']
      if (this.active) css.push('animate-shift')
      return css.join(' ')
    },
    svgClassName() {
      return this.active ? 'animate-shift' : ''
    }
  }
}
</script>

<style type="text/css">
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(0px);
    }
    10% {
      opacity: 0;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translateX(20px);
    }
  }

  .animate-shift {
    animation: fadeIn 2.1s infinite;
  }
</style>
