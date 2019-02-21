<template>
  <GeneratorShow :id="selectedModel.id" v-if="selectedModel"/>
</template>

<script>
import GeneratorShow from '@codotype/ui/src/modules/generator/pages/show'
import GeneratorFetchMixin from './GeneratorFetchMixin'

export default {
  name: 'GeneratorAbout',
  mixins: [GeneratorFetchMixin],
  components: {
    GeneratorShow
  }
}
</script>
