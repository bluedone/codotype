<template>
  <div>
    <div class="tree-wrapper" v-for="(data, index1) in dataList" >
      <div class="branch-attr" v-if="data.subData[0]">
        <div v-for="(subData, index) in data.subData" :class="['entry', (index+1)===data.subData.length?'lv-last':'', index===0?'lv1':'', data.subData.length===1?'onyOne':'']">
          <div class="desc" @click="goToItem(subData.url)">{{subData.subName}}</div>
        </div>
      </div>
      <div class="title-wraper">
        <div class="title">{{data.name}}</div>
      </div>
      <div class="branch" v-if="data.relations">
        <div v-for="(subData, index) in data.relations" :class="['entry', (index+1)===data.relations.length?'lv-last':'', index===0?'lv1':'', data.relations.length===1?'onyOne':'']">
          <div class="desc" @click="goToItem(subData.url)">{{subData.subName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { inflateRelation } from '@codotype/util/lib/inflate'

export default {
  methods: {
    goToItem(url){
      this.$emit('itemEvent:url', url)
    }
  },
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel'
    }),
    dataList () {
      let nodes = []

      if (!this.model) return nodes

      const schemas = this.$store.getters['editor/schema/collection/items']

      let schemaNode = {
        name: this.model.label + ' Model',
        subData: [],
        relations: []
      }

      const attributeNodes = this.model.attributes.map((attr) => {
        return {
          subName: attr.label,
          url: attr.id
        }
      })

      const relatedNodes = this.model.relations.map((rel) => {
        let inflated = inflateRelation({
          relation: rel,
          schemas: this.$store.getters['editor/schema/collection/items']
        })

        // TODO - THIS CHANGES BASED ON rel.type & rel.alias
        return {
          subName: inflated.schema.label + ` (as ${inflated.alias.label})`,
          // subName: inflated.alias.label + ` (${inflated.schema.label})`,
          subData: []
        }
      })

      // Adds nodes
      // attributeNodes.forEach(n => addNode(n))
      attributeNodes.forEach(n => schemaNode.subData.push(n))
      relatedNodes.forEach(n => schemaNode.relations.push(n))

      // Returns the nodes and links
      return [schemaNode]
    }
  }
}
</script>

<style scoped lang="sass">
  .tree-wrapper
    display: flex
    align-items: flex-start
    justify-content: center
    padding: 0.8rem
    .title-wraper
      display: flex
      justify-content: center
      align-items: center
      .title
        display: inline-block
        width: 10rem
        height: 2.66666rem
        line-height: 2.66666rem
        padding-left: 1rem
        font-size: 1.41666rem
        color: #FFFFFF
        // background-image: url("./bg.png")
        background-size: 3.58333rem 2.66666rem
        background-repeat: no-repeat
        background-color: #2481FC
        border-radius: 4px

      &::before
        content: ""
        width: 2rem
        border-top: 2px solid #2481FC

      &::after
        content: ""
        width: 2rem
        border-top: 2px solid orange
    .branch
      display: flex
      align-items: center
      justify-content: flex-start
      flex-wrap: wrap
      flex-direction: column
      .entry
        display: flex
        align-items: center
        justify-content: center
        position: relative
        padding: 1rem 0
        .desc
          cursor: pointer
          line-height: 2.66666rem
          width: 10.33333rem
          border-radius: 4px
          padding: 0 0.5rem
          font-size: 1.08333rem
          color: orange
          border: 1px solid orange
        &::before
          content: ""
          width: 2rem
          border-top: 2px solid orange
        &::after
          content: ""
          height: 100%
          border-left: 2px solid orange
          position: absolute
          left: 0
          top: 0
        &.lv1
          padding: 0 0 1rem 2rem
          &::before
            position: absolute
            top: 1.24999rem
            left: 0
          &::after
            height: 100%
            top: 1.33333rem
        &.lv-last
          &::after
            height: 50%
        &.onyOne
          &::after
            content: none

    .branch-attr
      display: flex
      align-items: center
      justify-content: flex-start
      flex-wrap: wrap
      flex-direction: column
      .entry
        display: flex
        align-items: center
        justify-content: center
        position: relative
        // padding: 1rem 0
        padding: 0 2rem 1rem 0
        .desc
          cursor: pointer
          line-height: 2.66666rem
          width: 10.33333rem
          border-radius: 4px
          padding: 0 0.5rem
          font-size: 1rem
          color: #1C6ADD
          border: 1px solid #2481FC
        &::before
          content: ""
          position: absolute
          right: 0
          width: 2rem
          border-top: 2px solid #2481FC
        &::after
          content: ""
          height: 100%
          border-left: 2px solid #2481FC
          position: absolute
          right: 0
          top: 0
        &.lv1
          padding: 0 2rem 1rem 0
          &::before
            position: absolute
            top: 1.24999rem
            right: 0
          &::after
            height: 100%
            top: 1.33333rem
        &.lv-last
          &::after
            height: 38%
        &.onyOne
          &::after
            content: none
</style>
