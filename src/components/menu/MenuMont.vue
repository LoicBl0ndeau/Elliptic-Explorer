<template>
  <div class="submenu">
    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a</label>
      <input
        id="a"
        @input="menuS.setValueOnGraphFromUserInput('A', 'a')"
      /><br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input
        id="b"
        @input="menuS.setValueOnGraphFromUserInput('B', 'b')"
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
        @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1-montgomery')"
      />
      <button @click="graphS.switchPointOrdinate(1)">Switch</button><br />
    </span>

    <div id="addition-montgomery">
      <span class="parameter">
        <label>x2</label>
        <input
          id="x2-montgomery"
          @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2-montgomery')"
        />
        <button @click="graphS.switchPointOrdinate(2)">Switch</button><br />
      </span>
    </div>

    <div id="multiplication-montgomery" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input id="factor-montgomery" value="2" style="width: 40px" />
        <button @click="computeMul">Compute</button><br />
      </span>
    </div>

    <h3 class="section">Result</h3>
    <span class="parameter">
      <label>x</label>
      <input id="result-x-montgomery" readonly/><br />
      <label>y</label>
      <input id="result-y-montgomery" readonly/><br />
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
    },
    displayNewCurve() {
      let a = this.menuS.getFloatFromInputId("a");
      let b = this.menuS.getFloatFromInputId("b");

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

        this.menuS.setInputValueFromGraphExpValue("a", "A");
        this.menuS.setInputValueFromGraphExpValue("b", "B");

        this.menuS.setInputValueFromGraphExpValue("x1-montgomery", "x_{1}");

        let op = this.menuS.getValueById("choix-op-montgomery");
        if (op == "Addition") {
          this.menuS.setInputValueFromGraphExpValue("x2-montgomery", "x_{2}");
          this.menuS.setInputValueFromGraphExpValue(
            "result-x-montgomery",
            "x_{3}"
          );
          this.menuS.setInputValueFromGraphExpValue(
            "result-y-montgomery",
            "y_{3}"
          );
        }
        if (op == "Multiplication") {
          let idResult = this.menuS.getIntFromInputId("factor-montgomery");
          this.menuS.setInputValueFromGraphExpValue(
            "result-x-montgomery",
            `x_{${idResult}}`
          );
          this.menuS.setInputValueFromGraphExpValue(
            "result-y-montgomery",
            `y_{${idResult}}`
          );
        }
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