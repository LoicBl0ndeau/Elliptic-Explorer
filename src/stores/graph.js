import { defineStore } from 'pinia'


export const graphStore = defineStore('graph', {
  state: () => ({
    // valeur par defaut, aucun graphique initialement dans le store
    graph: null,
  }),
  actions: {
    setParam(exp, value) {
      this.graph.setValueOfParameter(exp, value);
    },
    destroy() {
      this.graph.calculator.destroy();
    },
  }
});