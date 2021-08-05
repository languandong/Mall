<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props:{
    //列
    cols: {
      type: Number,
      default: 2
    },
    // 左右边距
    hMargin: {
      type: Number,
      default: 8
    },
    // 上下边距
    vMargin: {
      type: Number,
      default: 8
    },
    // 项之间宽度
    itemSpace: {
      type: Number,
      default: 8
    },
    //
    lineSpace: {
      type: Number,
      default: 8
    }
  },
  mounted() {
    setTimeout(this._autoLayout, 20)
  },
  updated() {
    this._autoLayout()
  },
  methods:{
    _autoLayout(){
      //获取元素
      let gridEl = this.$refs.gridView
      let children = gridEl.children
      //设置内边距
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}px`
      //计算item的宽度   （总宽度-左右边距-空隙宽度)/列数
      let itemWidth = (gridEl.clientWidth - 2 * this.hMargin - (this.cols-1) * this.itemSpace) / this.cols
      //给各项设置样式
      for(let i = 0;i < children.length; i++){
        let item = children[i]
        // 设置宽度
        item.style.width = itemWidth + 'px'
        // 即每行最后一块设置右边距
        if((i+1) % this.cols !== 0){
          item.style.marginRight = this.itemSpace + 'px'
        }
        // 即从第二行起的块要设置上边距
        if(i >= this.cols){
          item.style.marginTop = this.lineSpace + 'px '
        }
      }
    }
  }
}
</script>

<style scoped>
  .grid-view{
    display: flex;
    flex-wrap: wrap;
  }
</style>