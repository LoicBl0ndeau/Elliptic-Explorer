<template>
  <div class="submenu">

    <h3 class="section">Curve Equation</h3>

    <div id="edwards-eq"></div>

    <h3 class="section">Parameters</h3>

    <span id="error-mess-edwards"></span>

    <span class="parameter">
      <label>c</label>
      <input id="c" value="2" type="number" @input="menuS.setValueOnGraphFromUserInput('C', 'c'); verifyCandD();" /><br />
    </span>

    <span class="parameter">
      <label>d</label>
      <input id="d" value="1" type="number" @input="menuS.setValueOnGraphFromUserInput('D', 'd'); verifyCandD();" /><br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select id="choix-op-edwards" @change="displayCurveWithSelectedOperation">
        <option selected="yes">Addition</option>
        <option>Multiplication</option>
      </select><br />
    </span>

    <span class="parameter">
      <label>x1</label>
      <input id="x1-edwards" type="number" class="coord" @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1-edwards')" />
      <button @click="graphS.switchPointOrdinate(1)">Switch</button><br />
    </span>

    <div id="addition-edwards">
      <span class="parameter">
        <label>x2</label>
        <input id="x2-edwards" type="number" class="coord" @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2-edwards')" />
        <button @click="graphS.switchPointOrdinate(2)">Switch</button><br />
      </span>
    </div>

    <div id="multiplication-edwards" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input type="number" id="factor-edwards" value="2" style="width: 40px" />
        <button @click="computeMul">Compute</button><br />
      </span>
    </div>

    <h3 class="section">Result</h3>
    <span class="parameter">
      <span id="result-x-y-edwards" class="result"></span><br />
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
    // display curve equation
    this.menuS.displayLaTeX('edwards-eq', "x^2 + y^2 = c^2(1 +dx^2y^2)");
  },
  methods: {
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
    verifyCandD() {
      let c = this.menuS.getFloatFromInputId('c');
      let d = this.menuS.getFloatFromInputId('d');
      if (c == 0 || d == 0)
        this.menuS.displayLaTeX(
          "error-mess-edwards",
          "\\color{yellow} c \\text{ and } d \\text{ must be } \\newline \\text{defined such as : } \\newline c \\ne 0 \\text{ and } d \\ne 0 \\newline"
        );
      else if (c != 0 && d == 1 / c ** 4) {
        this.menuS.displayLaTeX(
          "error-mess-edwards",
          "\\color{yellow} d \\text{ must be defined such as : }\\newline d \\ne \\frac{1}{c^4} \\newline"
        );
      }
      else
        this.menuS.displayLaTeX("error-mess-edwards", "");
    },
    updateMenuInputWithGraphValue() {
      try {
        // if graph not initialized yet
        if (this.graphS.getGraph == null) return;

        this.menuS.setInputValueFromGraphExpValue("c", "C");
        this.menuS.setInputValueFromGraphExpValue("d", "D");

        this.menuS.setInputValueFromGraphExpValue("x1-edwards", "x_{1}");

        let op = this.menuS.getValueById("choix-op-edwards");
        let result_x = null;
        let result_y = null;
        if (op == "Addition") {
          this.menuS.setInputValueFromGraphExpValue("x2-edwards", "x_{2}");
          result_x = this.graphS.getExpValue(`x_{3}`);
          result_y = this.graphS.getExpValue(`y_{3}`);
        }
        if (op == "Multiplication") {
          let idResult = this.menuS.getIntFromInputId("factor-edwards");
          result_x = this.graphS.getExpValue(`x_{${idResult}}`);
          result_y = this.graphS.getExpValue(`y_{${idResult}}`);
        }
        document.getElementById("result-x-y-edwards").innerHTML = `(${result_x.toFixed(2)},   ${result_y.toFixed(2)})`;
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