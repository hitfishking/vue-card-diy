//fabric的canvas对象，在vue中被封装为一个组件而已。

<template>
  <canvas id="canvas"></canvas>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "CanvasCard",
    data() {
      return {
        self: null,
        dpr: window.devicePixelRatio,
      }
    },
    computed: {
      ...mapGetters([
        'htmlFontSize',
      ]),
      cW() {
        // return 9 * this.htmlFontSize
        // return this.getRemSize(360, this.htmlFontSize)
        return window.innerWidth < 415 ? window.innerWidth - 20 : 395
      },
      cH() {
        // return 5.7 * this.htmlFontSize
        // return this.getRemSize(238, this.htmlFontSize)
        return this.cW * 540 / 855
      }
    },
    mounted() {
      console.log('mounted card');
      // 会员卡尺寸 85.5*54毫米 (标准)
      // 在CanvasCard组件mounted()时，建立fabric.Canvas对象；
      // 所有的绘制内容，都在该Canvas对象中。
      // fabric.Canvas('canvas'),将外部库的对象，与vue的<canvas>组件联系在一起了；
      // 从此以后，就基本可以象操作vue组价一样操作使用fabric库。
      const card = this.self = new fabric.Canvas('canvas', {
        backgroundColor: 'white'
      })

      card.selection = false
      // card.hasControls = false
      // card.borderColor = '#ff8d23'
      card.preserveObjectStacking = true // 禁止选中图层时自定置于顶部

      //设置比实际大的canvas,解决高清屏幕下图片模糊
      // card.setWidth(this.cW * this.dpr)
      // card.setHeight(this.cH * this.dpr)
      card.setWidth(this.cW)
      card.setHeight(this.cH)

      this.addCardEventListener(card)
      this.initFrontCard(card)   //将canvas存储到store中.
      this.saveState()
    },
    beforeDestroy() {
      console.log('beforeDestroy card');
    },
    methods: {
      ...mapActions([
        'initFrontCard',
        'setSelectedObj',
        'saveState',
      ]),
      // setWHStyle(dom) {
      //   dom.style.width = this.cW + 'px'
      //   dom.style.height = this.cH + 'px'
      // },
      addCardEventListener(card) {
        card.on('object:added', (e) => {
          console.log('object:added')
          // this.saveState()
        })
        card.on('object:modified', (e) => {
          console.log('object:modified')
          this.saveState()
        })
        card.on('object:removed', (e) => {
          console.log('object:removed')
          this.saveState()
        })
        // card.on('object:selected', (e) => {
        //   console.log('object:selected', e.target)
        //   this.setSelectedObj(e.target)
        // })
        card.on('selection:created', (e) => {
          console.log('selection:created', e.target)
          this.setSelectedObj(e.target)
        })
        card.on('selection:updated', (e) => {
          console.log('selection:updated', e.target)
          this.setSelectedObj(e.target)
        })
        card.on('selection:cleared', (e) => {
          console.log('selection:cleared')
          this.setSelectedObj(null)
        })
      },
    }
  }
</script>

<style scoped>

</style>
