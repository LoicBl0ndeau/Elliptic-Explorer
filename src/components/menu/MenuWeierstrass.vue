<template>
  <div class="submenu">
    <h3 class="section">General Curve Equation</h3>
    
    <div id="general-weierstrass-eq"></div>

    <h3 class="section">Curve Equation</h3>
    
    <div id="weierstrass-eq"></div>

    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a1</label>
      <input
        id="a1"
        @input="menuS.setValueOnGraphFromUserInput('a_{1}', 'a1');updateLatex();"
        type="number"
      /><br />
    </span>

    <span class="parameter">
      <label>a3</label>
      <input
        id="a3"
        @input="menuS.setValueOnGraphFromUserInput('a_{3}', 'a3');updateLatex();"
        type="number"
      /><br />
    </span>

    <span class="parameter">
      <label>a2</label>
      <input
        id="a2"
        type="number"
        @input="menuS.setValueOnGraphFromUserInput('a_{2}', 'a2');updateLatex();"
      /><br />
    </span>

    <span class="parameter">
      <label>a4</label>
      <input
        id="a4"
        type="number"
        @input="menuS.setValueOnGraphFromUserInput('a_{4}', 'a4');updateLatex();"
      /><br />
    </span>

    <span class="parameter">
      <label>a6</label>
      <input
        id="a6"
        type="number"
        @input="menuS.setValueOnGraphFromUserInput('a_{6}', 'a6');updateLatex();"
      /><br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select
        id="choix-op-weierstrass"
        @change="displayCurveWithSelectedOperation"
      >
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <span class="parameter">
      <label>x1</label>
      <input
        id="x1"
        class="coord"
        type="number"
        @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1')"
      />
      <button @click="graphS.switchPointOrdinate(1)">Switch</button><br />
    </span>

    <div id="addition">
      <span class="parameter">
        <label>x2</label>
        <input
          id="x2"
          type="number"
          class="coord"
          @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2')"
        />
        <button @click="graphS.switchPointOrdinate(2)">Switch</button><br />
      </span>
    </div>

    <div id="multiplication" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input
          type="number"
          id="factor"
          value="2"
          style="width: 40px" />
        <button @click="computeMul">Compute</button><br />
      </span>
    </div>

    <h3 class="section">Result</h3>
    <span class="parameter">
      <span id="result-x-y" class="result"></span><br />
    </span>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { menuStore } from "@/stores/menu.js";

export default {
  name: "MenuWeierstrass",
  setup() {
    const graphS = graphStore();
    const menuS = menuStore();

    return { graphS, menuS };
  },
  mounted() {
    // update des valeurs dans le menu toutes les 500ms
    setInterval(this.updateMenuInputWithGraphValue, 500);
    // display curve equation
    this.menuS.displayLaTeX('general-weierstrass-eq', "y^2 + a_1 xy + a_3y = \\newline x^3 + a_2 x^2 + a_4 x + a_6");
  },
  methods: {
    displayDefaultCurve() {
      let a1 = 0;
      let a3 = 0;
      let a2 = 4;
      let a4 = 2;
      let a6 = 1;

      let xP = -2;
      let xQ = 1;

      // Display latex
      this.menuS.displayLaTeX('weierstrass-eq', "y^2 + "+a1+" xy + "+a3+"y = \\newline x^3 + "+a2+" x^2 + "+a4+" x + "+a6);

      this.graphS.displayWeierstrass(a1, a3, a2, a4, a6);
      this.graphS.showAddition(xP, xQ);

      // display default operation (Addition)
      this.menuS.setValueById("choix-op-weierstrass", "Addition");
      this.menuS.hideElementById("multiplication");
      this.menuS.displayElementById("addition");
    },
    displayNewCurve() {
      let a1 = this.menuS.getFloatFromInputId("a1");
      let a3 = this.menuS.getFloatFromInputId("a3");
      let a2 = this.menuS.getFloatFromInputId("a2");
      let a4 = this.menuS.getFloatFromInputId("a4");
      let a6 = this.menuS.getFloatFromInputId("a6");
      // Display latex
      this.menuS.displayLaTeX('weierstrass-eq', "y^2 + "+a1+" xy + "+a3+"y = \\newline x^3 + "+a2+" x^2 + "+a4+" x + "+a6);

      this.graphS.displayWeierstrass(a1, a3, a2, a4, a6);
    },
    updateLatex(){
      let a1 = this.menuS.getFloatFromInputId("a1");
      let a3 = this.menuS.getFloatFromInputId("a3");
      let a2 = this.menuS.getFloatFromInputId("a2");
      let a4 = this.menuS.getFloatFromInputId("a4");
      let a6 = this.menuS.getFloatFromInputId("a6");
      // Display latex
      this.menuS.displayLaTeX('weierstrass-eq', "y^2 + "+a1+" xy + "+a3+"y = \\newline x^3 + "+a2+" x^2 + "+a4+" x + "+a6);
    },
    displayCurveWithSelectedOperation() {
      this.displayNewCurve();
      let op = this.menuS.getValueById("choix-op-weierstrass");
      if (op == "Addition") {
        this.menuS.hideElementById("multiplication");
        this.menuS.displayElementById("addition");
        let xP = this.menuS.getFloatFromInputId("x1");
        let xQ = this.menuS.getFloatFromInputId("x2");
        this.graphS.showAddition(xP, xQ);
      }
      if (op == "Multiplication") {
        this.menuS.displayElementById("multiplication");
        this.menuS.hideElementById("addition");
        let k = this.menuS.getIntFromInputId("factor");
        let currentPoint = this.menuS.getFloatFromInputId("x1");
        this.graphS.showMul(currentPoint, k);
      }
    },
    computeMul() {
      let k = this.menuS.getIntFromInputId("factor");
      let currentPoint = this.menuS.getFloatFromInputId("x1");
      this.graphS.destroy();
      this.displayNewCurve();
      this.graphS.showMul(currentPoint, k);
    },
    updateMenuInputWithGraphValue() {
      try {
        // if graph not initialized yet
        if (this.graphS.getGraph == null) return;

        this.menuS.setInputValueFromGraphExpValue("a1", "a_{1}");
        this.menuS.setInputValueFromGraphExpValue("a3", "a_{3}");
        this.menuS.setInputValueFromGraphExpValue("a2", "a_{2}");
        this.menuS.setInputValueFromGraphExpValue("a4", "a_{4}");
        this.menuS.setInputValueFromGraphExpValue("a6", "a_{6}");

        this.menuS.setInputValueFromGraphExpValue("x1", "x_{1}");

        let op = this.menuS.getValueById("choix-op-weierstrass");
        let result_x = null;
        let result_y = null;
        if (op == "Addition") {
          this.menuS.setInputValueFromGraphExpValue("x2", "x_{2}");
          result_x = this.graphS.getExpValue(`x_{3}`);
          result_y = this.graphS.getExpValue(`y_{3}`);
        }
        if (op == "Multiplication") {
          let idResult = this.menuS.getIntFromInputId("factor");
          result_x = this.graphS.getExpValue(`x_{${idResult}}`);
          result_y = this.graphS.getExpValue(`y_{${idResult}}`);
        }
        document.getElementById("result-x-y").innerHTML = `(${result_x.toFixed(2)},   ${result_y.toFixed(2)})`;
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
  @import "../../../node_modules/katex/dist/katex.min.css";
</style>