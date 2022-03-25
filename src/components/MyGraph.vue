<template>
  <div id="calculator" ></div>
</template>

<script>
export default {
  name: "MyGraph",
  mounted() {
    var Desmos = require('desmos');
    var elt = document.getElementById('calculator');
    var options = {expressionsCollapsed: true}
    var calculator = Desmos.GraphingCalculator(elt, options);
    calculator.setExpression({ id: 'graph1', latex: 'y=x^2'});
  }
};
</script>

<style scoped>
#calculator {
  width: 100%;
  height:90%;
}
</style>