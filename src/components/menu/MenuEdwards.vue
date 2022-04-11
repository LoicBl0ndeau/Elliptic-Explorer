<template>
  <div class="submenu">
    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>c</label>
      <input
        id="c"
        @input="menuS.setValueOnGraphFromUserInput('A', 'a')"
      /><br />
    </span>

    <span class="parameter">
      <label>d</label>
      <input
        id="d"
        @input="menuS.setValueOnGraphFromUserInput('B', 'b')"
      /><br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select
        id="choix-op-edwards"
        @change="displayCurveWithSelectedOperation"
      >
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <span class="parameter">
      <label>x1</label>
      <input
        id="x1-edwards"
        @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1-edwards')"
      /><br />
    </span>

    <div id="addition-edwards">
      <span class="parameter">
        <label>x2</label>
        <input
          id="x2-edwards"
          @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2-edwards')"
        /><br />
      </span>
    </div>

    <div id="multiplication-edwards" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input id="factor-edwards" value="2" style="width: 40px" />
        <button @click="computeMul">Compute</button><br />
      </span>
    </div>

    <h3 class="section">Result</h3>
    <span class="parameter">
      <label>x</label>
      <input id="result-x-edwards" @keydown="() => false" /><br />
      <label>y</label>
      <input id="result-y-edwards" @keydown="() => false" /><br />
    </span>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { menuStore } from "@/stores/menu.js";

export default {
  name: "MenuEdwards",
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
      let c = 2;
      let d = -1;

      let xP = -0.84;
      let xQ = 1.5;

      this.graphS.displayEdwards(c, d);
      this.graphS.showAddition(xP, xQ);
    },
    displayNewCurve() {
      let c = this.menuS.getFloatFromInputId("c");
      let d = this.menuS.getFloatFromInputId("d");

      this.graphS.displayEdwards(c, d);
    },
    displayCurveWithSelectedOperation() {
      this.displayNewCurve();
      let op = this.menuS.getValueById("choix-op-edwards");
      if (op == "Addition") {
        this.menuS.hideElementById("multiplication-edwards");
        this.menuS.displayElementById("addition-edwards");
        let xP = this.menuS.getFloatFromInputId("x1-edwards");
        let xQ = this.menuS.getFloatFromInputId("x2-edwards");
        this.graphS.showAddition(xP, xQ);
      }
      if (op == "Multiplication") {
        this.menuS.displayElementById("multiplication-edwards");
        this.menuS.hideElementById("addition-edwards");
        let k = this.menuS.getIntFromInputId("factor-edwards");
        let currentPoint = this.menuS.getFloatFromInputId("x1-edwards");
        this.graphS.showMul(currentPoint, k);
      }
    },
    computeMul() {
      let k = this.menuS.getIntFromInputId("factor-edwards");
      let currentPoint = this.menuS.getFloatFromInputId("x1-edwards");
      this.graphS.destroy();
      this.displayNewCurve();
      this.graphS.showMul(currentPoint, k);
    },
    updateMenuInputWithGraphValue() {
      try {
        // if graph not initialized yet
        if (this.graphS.getGraph == null) return;

        this.menuS.setInputValueFromGraphExpValue("c", "C");
        this.menuS.setInputValueFromGraphExpValue("d", "D");

        this.menuS.setInputValueFromGraphExpValue("x1-edwards", "x_{1}");

        let op = this.menuS.getValueById("choix-op-edwards");
        if (op == "Addition") {
          this.menuS.setInputValueFromGraphExpValue("x2-edwards", "x_{2}");
          this.menuS.setInputValueFromGraphExpValue("result-x-edwards", "x_{3}");
          this.menuS.setInputValueFromGraphExpValue("result-y-edwards", "y_{3}");
        }
        if (op == "Multiplication") {
          let idResult = this.menuS.getIntFromInputId("factor-edwards");
          this.menuS.setInputValueFromGraphExpValue(
            "result-x-edwards",
            `x_{${idResult}}`
          );
          this.menuS.setInputValueFromGraphExpValue(
            "result-y-edwards",
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