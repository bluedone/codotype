<template>
  <BlueprintEditor />
</template>

<!-- // // // //  -->

<script>
import BlueprintEditor from '@codotype/ui/src/components/BlueprintEditor'

export default {
  props: ['blueprint_id'],
  metaInfo: {
    title: 'Blueprint'
  },
  components: {
    BlueprintEditor
  }
}
</script>
