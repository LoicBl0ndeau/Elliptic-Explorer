import { defineStore } from 'pinia'

import { WeierstrassGraph } from "@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const graphStore = defineStore('graph', {
  state: () => ({
    // valeur par defaut
    graph: null,
  }),
  actions: {
      initWeierstrass (a1, a3, a2, a4, a6) {
          this.graph = new WeierstrassGraph("calculator", a1, a3, a2, a4, a6);
      },
      setA1 (a1) {
        console.log(graphStore.graph);
        this.graphS.graph.setValueOfParameter("a_{1}", a1);
      }
  }
});