<template>
  <GeneratorStart :model="selectedModel" v-if="selectedModel"/>
</template>

<script>
import GeneratorStart from '@codotype/ui/src/modules/generator/components/GeneratorStart'
import GeneratorFetchMixin from './GeneratorFetchMixin'

export default {
  name: 'GeneratorAbout',
  mixins: [GeneratorFetchMixin],
  components: {
    GeneratorStart
  },
  metaInfo () {
    return {
      title: this.selectedModel.label
    }
  }
}
</script>
