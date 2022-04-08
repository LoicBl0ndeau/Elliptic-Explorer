<template>
  <div class="submenu">
    <h3 class="section" >Parameters</h3>

    <span class="parameter">
      <label>a1</label>
      <input id="a1" value="0" @input="changeValueOnGraph('a', 1)" /><br />
    </span>

    <span class="parameter">
      <label>a3</label>
      <input id="a3" value="0" @input="changeValueOnGraph('a', 3)" /><br />
    </span>

    <span class="parameter">
      <label>a2</label>
      <input id="a2" value="4" @input="changeValueOnGraph('a', 2)" /><br />
    </span>

    <span class="parameter">
      <label>a4</label>
      <input id="a4" value="2" @input="changeValueOnGraph('a', 4)" /><br />
    </span>

    <span class="parameter">
      <label>a6</label>
      <input id="a6" value="1" @input="changeValueOnGraph('a', 6)" /><br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select
        name="choix-operation"
        id="choix-op-weierstrass"
        @change="displayOperationParameters"
      >
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <div id="addition">
      <span class="parameter">
        <label>x1</label>
        <input id="x1" value="0" @input="changeValueOnGraph('x', 1)"/><br />
      </span>
      <span class="parameter">
        <label>x2</label>
        <input id="x2" value="2" @input="changeValueOnGraph('x', 2)"/><br />
      </span>
    </div>

    <div id="multiplication" style="display: none;">
      <span class="parameter">
        <label>x0</label>
        <input id="x0" value="0" @input="changeValueOnGraph('x', 1)" /><br />
      </span>
      <span class="parameter">
        <label >Factor</label>
        <input id="factor" value="2" style="width: 40px;"/>
        <button @click="newMul">Compute</button><br />
      </span>
    </div>
    <span class="parameter">
        <label>Result</label> <br />
        <label>x</label>
        <input id="result-x" @keydown="() => false"/><br />
        <label>y</label>
        <input id="result-y" @keydown="() => false"/><br />
      </span>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { weierstrassStore } from "@/stores/weierstrass";

export default {
  name: "MenuParametreShort",
  setup() {
    const graphS = graphStore();
    const weierstrass = weierstrassStore();

    return { graphS, weierstrass };
  },
  mounted () {
    // update des valeurs dans le menu toutes les 700ms
    setInterval(this.listenToGraphValueChanges, 700);
  },
  methods: {
    listenToGraphValueChanges () {
      let a1 = this.graphS.getParam('a_{1}');
      let a2 = this.graphS.getParam('a_{2}');
      let a3 = this.graphS.getParam('a_{3}');
      let a4 = this.graphS.getParam('a_{4}');
      let a6 = this.graphS.getParam('a_{6}');
      let x1 = this.graphS.getParam('x_{1}');
      let x2 = this.graphS.getParam('x_{2}');
      document.getElementById('a1').value = a1;
      document.getElementById('a2').value = a2;
      document.getElementById('a3').value = a3;
      document.getElementById('a4').value = a4;
      document.getElementById('a6').value = a6;
      document.getElementById('x0').value = x1;
      document.getElementById('x1').value = x1;
      document.getElementById('x2').value = x2;

      let op = document.getElementById("choix-op-weierstrass").value;
      let resultX = NaN;
      let resultY = NaN;
      if (op == "Addition") {
        resultX = this.graphS.getParam('x_{3}').toFixed(2);
        resultY = this.graphS.getParam('y_{3}').toFixed(2);
      }
      else {
        resultX = this.graphS.getParam('x_{2}').toFixed(2);
        resultY = this.graphS.getParam('y_{2}').toFixed(2);
      }
      document.getElementById('result-x').value = resultX;
      document.getElementById('result-y').value = resultY;
    },
    displayOperationParameters() {
      this.graphS.destroy();
      this.displayCurve();
      let op = document.getElementById("choix-op-weierstrass").value;
      // actions
      if (op == "Multiplication") {
        // remove addition elem from page
        document.getElementById('addition').style.display = "none";
        document.getElementById("multiplication").style.display = "inline";
        let k = Number.parseFloat(this.getFactor());
        this.weierstrass.showMul(k);
      } else {
        document.getElementById("multiplication").style.display = "none";
        document.getElementById("addition").style.display = "inline";
        this.weierstrass.showAddition();
      }
    },
    /**
     * Get the valie of the elem whose id is : param+i
     * Ex: to get the value of id="x1" => getInputValue("x", 1)
     */
    getInputValue(param, i) {
      return document.getElementById(param + i).value;
    },
    /**
     * Change la valeur de l'expression dans DesmosAPI par la valeur
     * spécifiée dans l'input ayant pour id : param+i
     */
    changeValueOnGraph(param, i) {
      this.graphS.setParam(`${param}_{${i}}`, Number.parseFloat(this.getInputValue(param, i)));
    },
    getFactor() {
      return document.getElementById("factor").value;
    },
    
    displayCurve() {
      let a1 = Number.parseFloat(this.getInputValue("a", 1));
      let a3 = Number.parseFloat(this.getInputValue("a", 3));
      let a2 = Number.parseFloat(this.getInputValue("a", 2));
      let a4 = Number.parseFloat(this.getInputValue("a", 4));
      let a6 = Number.parseFloat(this.getInputValue("a", 6));
      this.weierstrass.create(a1, a3, a2, a4, a6);
    },
    displayOperation() {
      this.displayCurve();
      let op = document.getElementById("choix-op-weierstrass").value;
      if (op == "Addition") {
        this.weierstrass.showAddition();
      }
      if (op == "Multiplication") {
        let k = Number.parseFloat(this.getFactor());
        this.weierstrass.showMul(k);
      }
    },
    newMul() {
      // in order to keep the same point position
      let currentPointXPos = Number.parseFloat(
        this.graphS.graph.getValueOfParameter("x_{1}")
      );
      this.graphS.destroy();
      this.displayCurve();
      let k = Number.parseFloat(this.getFactor());
      this.weierstrass.showMul(currentPointXPos, k);
    },
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>