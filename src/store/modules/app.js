const app = {
  state: {
    htmlFontSize: null,
    cardType: 1,
    frontCard: null,       //存储的是canvas对象；
    behindCard: null,
    selectedObj: null,     //存储当前选择的对象.
    canvasState: null,     //状态以json格式存储.
    undoList: [],
    redoList: [],
    previewImg: null,
  },
  mutations: {
    SET_HTMLFONTSIZE: (state, fontSize) => {
      state.htmlFontSize = fontSize
    },
    INIT_FRONTCARD: (state, fCanvas) => {
      state.frontCard = fCanvas
    },
    INIT_BEHINDCARD: (state, fCanvas) => {
      state.behindCard = fCanvas
    },
    SET_SELECTEDOBJ: (state, object) => {
      state.selectedObj = object
    },
    SET_CANVASSTATE: (state, canvasState) => {
      state.canvasState = canvasState
    },
    ADD_UNDO: (state, canvasState) => {
      state.undoList.push(canvasState)
    },
    POP_UNDO: (state) => {
      state.undoList.pop()
    },
    ADD_REDO: (state, canvasState) => {
      state.redoList.push(canvasState)
    },
    POP_REDO: (state) => {
      state.redoList.pop()
    },
    SET_REDOLIST: (state, list) => {
      state.redoList = list
    },
    SET_PREVIEW_IMG: (state, img) => {
      state.previewImg = img
    }
  },
  actions: {   //action自动提供一个store对象为参数；
    setHtmlFontSize({commit}, fontSize) {
      commit('SET_HTMLFONTSIZE', fontSize)
    },
    initFrontCard({commit}, fCanvas) {  //initFrontCard()存储canvas对象到state.frontCard字段中。
      commit('INIT_FRONTCARD', fCanvas)
    },
    initBehindCard({commit}, fCanvas) {
      commit('INIT_BEHINDCARD', fCanvas)
    },
    setSelectedObj({commit}, object) {  //直接将fabric绘图对象存储在state.selectedObj字段中。
      commit('SET_SELECTEDOBJ', object)
    },
    setCanvasState({commit}, canvasState) {
      commit('SET_CANVASSTATE', canvasState)
    },
    addUndo({commit}, canvasState) {
      commit('ADD_UNDO', canvasState)
    },
    popUndo({commit}) {
      commit('POP_UNDO')
    },
    addRedo({commit}, canvasState) {
      commit('ADD_REDO', canvasState)
    },
    popRedo({commit}) {
      commit('POP_REDO')
    },
    setRedo({commit}, list) {
      commit('SET_REDOLIST', list)
    },
    saveState({commit, state}) {
      // 清空恢复栈redoList
      commit('SET_REDOLIST', [])

      if (state.canvasState) {
        commit('ADD_UNDO', state.canvasState)  //保存state之间，先将前一个state存到undo数组中。
      }
      console.log(state.frontCard.toJSON([
        'hasControls',
        'borderColor',
      ]))
      commit('SET_CANVASSTATE', state.frontCard.toJSON([  //state以json格式存储.
        'hasControls',
        'borderColor',
        'scaleX',
        'scaleY',
        'angle',
        'top',
        'left',
        'crossOrigin'
      ]))

      // console.log(state.canvasState)
    },
    // 撤销
    undo({commit, state}) {
      commit('ADD_REDO', state.canvasState)
      const lastState = {...state.undoList[state.undoList.length - 1]}
      commit('SET_CANVASSTATE', lastState)
      // this.popUndo()
      commit('POP_UNDO')
      state.frontCard.loadFromJSON(lastState, () => {  //frontCard恢复到前一个状态后，渲染。
        state.frontCard.renderAll()
      })
    },
    // 恢复
    redo({commit, state}) {
      commit('ADD_UNDO', state.canvasState)
      const lastState = {...state.redoList[state.redoList.length - 1]}
      commit('SET_CANVASSTATE', lastState)
      commit('POP_REDO')
      console.log('lastState', lastState)
      state.frontCard.loadFromJSON(lastState, () => {
        state.frontCard.renderAll()
      })
    },
    // 预览图片
    setPreviewImg({commit}, img) {
      commit('SET_PREVIEW_IMG', img)
    },
  }
}

export default app
