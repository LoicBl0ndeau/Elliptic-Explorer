<template>
  <div class="submenu">
    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a</label>
      <input
        id="a-montgomery"
        @input="menuS.setValueOnGraphFromUserInput('A', 'a-montgomery')"
      /><br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input
        id="b-montgomery"
        @input="menuS.setValueOnGraphFromUserInput('B', 'b-montgomery')"
      /><br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select
        id="choix-op-montgomery"
        @change="displayCurveWithSelectedOperation"
      >
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <span class="parameter">
      <label>x1</label>
      <input
        id="x1-montgomery"
        class="coord"
        @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1-montgomery')"
      />
      <button @click="graphS.switchPointOrdinate(1)">Switch</button><br />
    </span>

    <div id="addition-montgomery">
      <span class="parameter">
        <label>x2</label>
        <input
          id="x2-montgomery"
          class="coord"
          @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2-montgomery')"
        />
        <button @click="graphS.switchPointOrdinate(2)">Switch</button><br />
      </span>
    </div>

    <div id="multiplication-montgomery" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input
          type="number"
          id="factor-montgomery" 
          value="2"
          style="width: 40px" />
        <button @click="computeMul">Compute</button><br />
      </span>
    </div>

    <h3 class="section">Result</h3>
    <span class="parameter">
      <span id="result-x-y-montgomery" class="result"></span><br />
    </span>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { menuStore } from "@/stores/menu.js";

export default {
  name: "MenuMontgomery",
  setup() {
    const graphS = graphStore();
    const menuS = menuStore();

    return { graphS, menuS };
  },
  mounted() {
    // update des valeurs dans le menu toutes les 500ms
    setInterval(this.updateMenuInputWithGraphValue, 500);
  },
  methods: {
    displayDefaultCurve() {
      let a = 6;
      let b = 2;

      let xP = -3;
      let xQ = 2;

      this.graphS.displayMontgomery(a, b);
      this.graphS.showAddition(xP, xQ);

      // display default operation (Addition)
      this.menuS.setValueById("choix-op-montgomery", "Addition");
      this.menuS.hideElementById("multiplication-montgomery");
      this.menuS.displayElementById("addition-montgomery");
    },
    displayNewCurve() {
      let a = this.menuS.getFloatFromInputId("a-montgomery");
      let b = this.menuS.getFloatFromInputId("b-montgomery");

      this.graphS.displayMontgomery(a, b);
    },
    displayCurveWithSelectedOperation() {
      this.displayNewCurve();
      let op = this.menuS.getValueById("choix-op-montgomery");
      if (op == "Addition") {
        this.menuS.hideElementById("multiplication-montgomery");
        this.menuS.displayElementById("addition-montgomery");
        let xP = this.menuS.getFloatFromInputId("x1-montgomery");
        let xQ = this.menuS.getFloatFromInputId("x2-montgomery");
        this.graphS.showAddition(xP, xQ);
      }
      if (op == "Multiplication") {
        this.menuS.displayElementById("multiplication-montgomery");
        this.menuS.hideElementById("addition-montgomery");
        let k = this.menuS.getIntFromInputId("factor-montgomery");
        let currentPoint = this.menuS.getFloatFromInputId("x1-montgomery");
        this.graphS.showMul(currentPoint, k);
      }
    },
    computeMul() {
      let k = this.menuS.getIntFromInputId("factor-montgomery");
      let currentPoint = this.menuS.getFloatFromInputId("x1-montgomery");
      this.graphS.destroy();
      this.displayNewCurve();
      this.graphS.showMul(currentPoint, k);
    },
    updateMenuInputWithGraphValue() {
      try {
        // if graph not initialized yet
        if (this.graphS.getGraph == null) return;

        this.menuS.setInputValueFromGraphExpValue("a-montgomery", "A");
        this.menuS.setInputValueFromGraphExpValue("b-montgomery", "B");

        this.menuS.setInputValueFromGraphExpValue("x1-montgomery", "x_{1}");

        let op = this.menuS.getValueById("choix-op-montgomery");
        let result_x = null;
        let result_y = null;
        if (op == "Addition") {
          this.menuS.setInputValueFromGraphExpValue("x2-montgomery", "x_{2}");
          result_x = this.graphS.getExpValue(`x_{3}`);
          result_y = this.graphS.getExpValue(`y_{3}`);
        }
        if (op == "Multiplication") {
          let idResult = this.menuS.getIntFromInputId("factor");
          result_x = this.graphS.getExpValue(`x_{${idResult}}`);
          result_y = this.graphS.getExpValue(`y_{${idResult}}`);
        }
        document.getElementById("result-x-y-montgomery").innerHTML = `(${result_x.toFixed(2)},   ${result_y.toFixed(2)})`;
      } catch (err) {
        // console.log(err);
        return;
      }
    },
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>