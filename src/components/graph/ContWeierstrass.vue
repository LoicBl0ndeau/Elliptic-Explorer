<template>
    <div id="calculator" ></div>
</template>

<script>
import { WeierstrassGraph } from '@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js';

export default {
  name: "ContinuousWeierstrass",
  props: {
      a1: {
          type: Number,
          default: 0,
      },
      a3: {
          type: Number,
          default: 0,
      },
      a2: {
          type: Number,
          default: 0,
      },
      a4: {
          type: Number,
          default: 2,
      },
      a6: {
          type: Number,
          default: 1,
      },
  },
  mounted() {
    let graph = new WeierstrassGraph("calculator", this.a1, this.a3, this.a2, this.a4, this.a6);
    graph.showCurve();
    graph.addCurvePoint(0);
    graph.addCurvePoint(2);
    graph.showAdditionOfPoints(1,2);
    }
};
</script>

<style scoped>
#calculator {
  width: 100%;
  height:90%;
}
</style>