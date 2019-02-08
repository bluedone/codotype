<template>
  <b-row>

    <b-col lg=4 sm=12 class="border-right">
      <SchemaForm />
      <SchemaNewButton />
      <SchemaList />
    </b-col>

    <b-col lg=8 sm=12>
      <SchemaDetail id="model-detail" />
    </b-col>

  </b-row>
</template>

<script>
import SchemaNewButton from './components/schema/SchemaNewButton'
import SchemaForm from './components/schema/SchemaForm'
import SchemaList from './components/schema/SchemaList'
import SchemaDetail from './components/schema/SchemaDetail'

export default {
  name: 'BlueprintEditor',
  components: {
    SchemaNewButton,
    SchemaForm,
    SchemaList,
    SchemaDetail
  },
  created () {
    this.$store.dispatch('editor/created')
  }
}
</script>
