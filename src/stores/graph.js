import { defineStore } from 'pinia'


export const graphStore = defineStore('graph', {
  state: () => ({
    // valeur par defaut, aucun graphique initialement dans le store
    graph: null,
  }),
  actions: {
    getParam(exp) {
      return this.graph.getValueOfParameter(exp);
    },
    setParam(exp, value) {
      this.graph.setValueOfParameter(exp, value);
    },
    destroy() {
      this.graph.calculator.destroy();
    },
  }
});