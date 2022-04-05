<template>
  <div id="calculator"></div>
  <button id="set" type="button" @onclick="test"> Display </button>
</template>

<script>
import { WeierstrassGraph } from "@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js";
import { wieierstrassStore } from "@/stores/wieierstrass.js";

export default {
  name: "ContinuousWeierstrass",
  setup() {
    const paramWeierstrass = wieierstrassStore();

    return { paramWeierstrass };
  },
  mounted() {
    let graph = new WeierstrassGraph(
      "calculator",
      this.paramWeierstrass.a1,
      this.paramWeierstrass.a3,
      this.paramWeierstrass.a2,
      this.paramWeierstrass.a4,
      this.paramWeierstrass.a6
    );
    graph.showCurve();
    graph.addCurvePoint(0);
    graph.showDoublingPoint(1);
    for (let i = 2; i < 6; i++) {
      graph.showAdditionOfPoints(1, i);
    }
    graph.setValueOfParameter("a_1", 50)
  },
  methods: {
    test () {
      this.paramWeierstrass.setA1(50);
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