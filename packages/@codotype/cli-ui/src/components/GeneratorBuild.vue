<template>
  <GeneratorBuild :id="generatorId" v-if="!fetching && generatorId"/>
</template>

<script>
import GeneratorBuild from '@codotype/ui/src/modules/generator/pages/build'
import GeneratorFetchMixin from './GeneratorFetchMixin'

export default {
  name: 'GeneratorShow',
  mixins: [GeneratorFetchMixin],
  components: {
    GeneratorBuild
  }
}
</script>
