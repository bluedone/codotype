<template>
  <div class="card card-body">
    <p class="lead mb-0">Model Preview</p>
    <div class="tree-wrapper" >
      <div class="branch-attr" v-if="model.attributes[0]">
        <div v-for="(subData, index) in model.attributes" :class="['entry', (index+1)===model.attributes.length?'lv-last':'', index===0?'lv1':'', model.attributes.length===1?'onyOne':'']">
          <div class="desc">{{subData.label}}</div>
        </div>
      </div>
      <div class="title-wraper">
        <div class="title">{{model.label}}</div>
      </div>
      <div class="branch" v-if="model.relations">
        <div v-for="(subData, index) in dataList.relations" :class="['entry', (index+1)===model.relations.length?'lv-last':'', index===0?'lv1':'', model.relations.length===1?'onyOne':'']">
          <div class="desc">{{subData.alias.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { inflateRelation } from '@codotype/util/lib/inflate'

export default {
  computed: {
    ...mapGetters({
      model: 'editor/schema/selectedModel'
    }),
    dataList () {
      let nodes = []

      if (!this.model) return nodes

      const schemas = this.$store.getters['editor/schema/collection/items']

      let schemaNode = {
        label: this.model.label + ' Model',
        attributes: [],
        relations: []
      }

      // Adds nodes
      this.model.attributes.forEach(n => schemaNode.attributes.push(n))
      this.model.relations.forEach(rel => {
        const inflated = inflateRelation({
          relation: rel,
          schemas: this.$store.getters['editor/schema/collection/items']
        })
        schemaNode.relations.push(inflated)
      })

      // Returns the nodes and links
      return schemaNode
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
        line-height: 2.66666rem
        font-size: 1rem
        text-align: center
        color: #FFFFFF
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
          font-size: 0.8rem
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
          font-size: 0.8rem
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
