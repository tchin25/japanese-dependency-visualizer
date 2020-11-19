import { createStore } from "vuex";

export default createStore({
  state: {
    sentence: "",
  },
  getters: {
    tokenizedSentence: (state) =>
      state.sentence.length > 0 ? state.sentence.split("|") : [],
  },
  mutations: {
    updateSentence(state, sentence) {
      state.sentence = sentence;
    },
  },
  actions: {
    // mergeSentenceFlow({ state, commit }, newFlow) {
    //   if (state.sentenceFlow.length === 0) {
    //     let sentenceFlow = newFlow.map((token, index) => {
    //       return [
    //         {
    //           id: newFlow.length - index - 1,
    //           label: token,
    //           children: [],
    //           parent: -1,
    //         },
    //       ];
    //     });
    //     commit("updateSentenceFlow", sentenceFlow);
    //   }
    // },
  },
  modules: {},
});
