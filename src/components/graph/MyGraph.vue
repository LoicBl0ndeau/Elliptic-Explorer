<template>
  <div id="calculator"></div>
  <button id="set" type="button" @click="test"> CHANGER CETTE PUTAIN DE VALEUR </button>
</template>

<script>
// import { WeierstrassGraph } from "@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js";
import { graphStore } from "@/stores/graph.js";

export default {
  name: "ContinuousWeierstrass",
  setup() {
    const graphS = graphStore();

    return { graphS };
  },
  mounted() {
    this.graphS.initWeierstrass(0, 0, 0, 2, 1);
    this.graphS.graph.showCurve();
    this.graphS.graph.addCurvePoint(0);
    this.graphS.graph.showDoublingPoint(1);
  },
  methods: {
    test () {
      this.graphS.graph.setValueOfParameter("a_{1}", 4);
    }
  }
};
</script>

<style scoped>
#calculator {
  width: 100%;
  height: 90%;
}
</style>