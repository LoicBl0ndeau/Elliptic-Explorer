<template>
  <div id="calculator" style="width: 1200px; height: 600px;"></div>
  <button type="button" id="button1">Reset</button>
</template>

<script>
export default {
  name: "MyGraph",
  props: {
    graphId: {
      type: String,
      default: "graph1"
    },
    latexEquation: {
      type: String,
      default: "y^2 = x^3 + 2*x + 1"
    }
  },
  mounted() {
    var Desmos = require('desmos');
    var elt = document.getElementById('calculator');
    var options = {expressionsCollapsed: true}
    var calculator = Desmos.GraphingCalculator(elt, options);
    calculator.setExpression({
      id: this.graphId,
      latex: this.latexEquation
    });
  }
};
</script>

<style scoped>
#calculator {
  width: 100%;
  height:90%;
}
</style>