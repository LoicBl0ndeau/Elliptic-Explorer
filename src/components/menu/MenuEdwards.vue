<template>
  <div class="submenu">

    <h3 class="section">Curve Equation</h3>
    <div id="Edwards-general-equation"></div>
    <div id="Edwards-actual-equation"></div>

    <!-- <h3 class="section">Discriminant</h3> -->
    <div id="Edwards-general-discriminant"></div>
    <div id="Edwards-actual-discriminant"></div>

    <h3 class="section">Parameters</h3>

    <span id="error-mess-edwards"></span>

    <span class="parameter">
      <label>c</label>
      <input id="c-Edwards" type="number" @change="setCoefficient('c-Edwards')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('C', 'c'); verifyCandD();" -->
      <br />
    </span>

    <span class="parameter">
      <label>d</label>
      <input id="d-Edwards" type="number" @change="setCoefficient('d-Edwards')" />
      <br />
      <!-- @input="menuS.setValueOnGraphFromUserInput('D', 'd'); verifyCandD();" /> -->
    </span>

    <span class="parameter" id="p_container_Edwards">
      <label>p</label>
      <input id="p-Edwards" type="number" placeholder="Prime number" @change="setCoefficient('p-Edwards')" />
      <br />
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
      <input id="x1-edwards" type="number" class="coord"
        @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1-edwards')" />
      <button @click="graphS.switchPointOrdinate(1)">Switch</button><br />
    </span>

    <div id="addition-edwards">
      <span class="parameter">
        <label>x2</label>
        <input id="x2-edwards" type="number" class="coord"
          @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2-edwards')" />
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
  props: {
    controleur: {
      type: Object,
      required: true
    }
  },
  setup() {
    const graphS = graphStore();
    const menuS = menuStore();

    return { graphS, menuS };
  },
  methods: {
    updateAll() {
      this.setAndDisplayInputsValue();
      this.updateLatexDisplay();
    },
    setCoefficient(inputId) {
      let value = document.getElementById(inputId).value;
      let coefName = inputId[0];
      this.controleur.coefficients.setCoef(coefName, value);
      this.updateLatexDisplay();
      this.displayNewCurve();
    },
    setAndDisplayInputsValue() {
      let c = this.controleur.coefficients.c;
      let d = this.controleur.coefficients.d;
      let p = this.controleur.coefficients.p;

      document.getElementById('c-Edwards').value = c;
      document.getElementById('d-Edwards').value = d;
      document.getElementById('p-Edwards').value = p;

      let displayValue = this.controleur.getCorps() == "Modulo" ? "block" : "none";
      document.getElementById('p_container_Edwards').style.display = displayValue;
    },
    updateLatexDisplay() {
      let actualCorps = this.controleur.getCorps();

      let c = this.controleur.coefficients.c
      let d = this.controleur.coefficients.d
      let p = this.controleur.coefficients.p

      let highlightColor = 'cyan';
      let generalEquationModulo = 'x^2 + y^2 \\underset{' + p + '}\\equiv c^2(1 +dx^2y^2)';
      let generalEquationReels = 'x^2 + y^2 = {\\color{' + highlightColor + '}c}^2(1 +{\\color{' + highlightColor + '}d}x^2y^2)';
      let actualEquationModulo = 'x^2 + y^2 \\underset{' + p + '}\\equiv ' + c + '^2(1 +' + d + 'x^2y^2)';
      let actualEquationReels = 'x^2 + y^2 = {\\color{' + highlightColor + '}' + c + '}^2(1 +{\\color{' + highlightColor + '}' + d + '}x^2y^2)';

      let generalEquation = actualCorps == "Modulo" ? generalEquationModulo : generalEquationReels;
      let actualEquation = actualCorps == "Modulo" ? actualEquationModulo : actualEquationReels;

      //let discriminantGeneralEquation = 'Δ = ?';
      //let discriminantResult = 'Δ = ' + String(?);

      // Display latex  
      this.menuS.displayLaTeX('Edwards-general-equation', generalEquation);
      this.menuS.displayLaTeX('Edwards-actual-equation', actualEquation);

      //this.menuS.displayLaTeX('Short_Weierstrass-general-discriminant', discriminantGeneralEquation);
      //this.menuS.displayLaTeX('Short_Weierstrass-actual-discriminant', discriminantResult);
    },
    displayNewCurve() {
      let c = this.menuS.getFloatFromInputId("c");
      let d = this.menuS.getFloatFromInputId("d");

      this.graphS.displayEdwards(c, d);
      this.graphS.showAddition(-2, 1); // show a random addition on the graph
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
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>