<template>
    <div id="calculator" ></div>
</template>

<script>
import { WeierstrassGraph } from 'ecgraph'

export default {
  name: "ContinuousShortWeierstrass",
  props: {
      id_graph_wrapper: {
          type: String
      }
  },
  mounted() {
    let graph = new WeierstrassGraph("calculator", 0, 0, 0, 2, 1);
    graph.showCurve();
    graph.addCurvePoint(1);
    graph.addCurvePoint(2);
    graph.addDraggablePoint([3,2],'XY');
    graph.addLine(1,1);
    graph.lines['1'].linkLineToPoints(graph.points['1'],graph.points['2']);
  }
};
</script>

<style scoped>
#calculator {
  width: 100%;
  height:90%;
}
</style>