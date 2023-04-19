<template>
  <div class="submenu">

    <h3 class="section">Curve Equation</h3>
    <div id="Weierstrass-general-equation"></div>
    <br>
    <div id="Weierstrass-actual-equation"></div>

    <!-- <h3 class="section">Discriminant</h3> -->
    <div id="Weierstrass-general-discriminant"></div>
    <div id="Weierstrass-actual-discriminant"></div>

    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a1</label>
      <input id="a1-Weierstrass" type="number" @change="setCoefficient('a1-Weierstrass')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('a_{1}', 'a1-Weierstrass')" -->
      <br />
    </span>

    <span class="parameter">
      <label>a3</label>
      <input id="a3-Weierstrass" type="number" @change="setCoefficient('a3-Weierstrass')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('a_{3}', 'a3-Weierstrass')" -->
      <br />
    </span>

    <span class="parameter">
      <label>a2</label>
      <input id="a2-Weierstrass" type="number" @change="setCoefficient('a2-Weierstrass')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('a_{2}', 'a2-Weierstrass')" -->
      <br />
    </span>

    <span class="parameter">
      <label>a4</label>
      <input id="a4-Weierstrass" type="number" @change="setCoefficient('a4-Weierstrass')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('a_{4}', 'a4-Weierstrass')" -->
      <br />
    </span>

    <span class="parameter">
      <label>a6</label>
      <input id="a6-Weierstrass" type="number" @change="setCoefficient('a6-Weierstrass')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('a_{6}', 'a6-Weierstrass')" -->
      <br />
    </span>

    <span class="parameter" id="p_container_Weierstrass">
      <label>p</label>
      <input id="p-Weierstrass" type="number" placeholder="Prime number" @change="setCoefficient('p-Weierstrass')" />
      <br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select id="choix-op-weierstrass" @change="displayCurveWithSelectedOperation">
        <option selected="yes">Addition</option>
        <option>Multiplication</option>
      </select><br />
    </span>

    <span class="parameter">
      <label>x1</label>
      <input id="x1" class="coord" type="number" @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1')" />
      <button @click="graphS.switchPointOrdinate(1)">Switch</button><br />
    </span>

    <div id="addition">
      <span class="parameter">
        <label>x2</label>
        <input id="x2" class="coord" type="number" @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2')" />
        <button @click="graphS.switchPointOrdinate(2)">Switch</button><br />
      </span>
    </div>

    <div id="multiplication" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input type="number" id="factor" value="2" style="width: 40px" />
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
  mounted() {
    // update des valeurs dans le menu toutes les 500ms
    setInterval(this.updateMenuInputWithGraphValue, 500);
  },
  methods: {
    updateAll() {
      this.setAndDisplayInputsValue();
      this.updateLatexDisplay();
    },
    setCoefficient(inputId) {
      let value = document.getElementById(inputId).value;
      let coefName = inputId[0] + inputId[1];
      this.controleur.coefficients.setCoef(coefName, value);
      this.updateLatexDisplay();
    },
    setAndDisplayInputsValue() {
      let a1 = this.controleur.coefficients.a1;
      let a2 = this.controleur.coefficients.a2;
      let a3 = this.controleur.coefficients.a3;
      let a4 = this.controleur.coefficients.a4;
      let a6 = this.controleur.coefficients.a6;
      let p = this.controleur.coefficients.p;

      document.getElementById('a1-Weierstrass').value = a1;
      document.getElementById('a2-Weierstrass').value = a2;
      document.getElementById('a3-Weierstrass').value = a3;
      document.getElementById('a4-Weierstrass').value = a4;
      document.getElementById('a6-Weierstrass').value = a6;
      document.getElementById('p-Weierstrass').value = p;

      let displayValue = this.controleur.getCorps() == "Modulo" ? "block" : "none";
      document.getElementById('p_container_Weierstrass').style.display = displayValue;
    },
    updateLatexDisplay() {
      let actualCorps = this.controleur.getCorps();

      let a1 = this.controleur.coefficients.a1;
      let a2 = this.controleur.coefficients.a2;
      let a3 = this.controleur.coefficients.a3;
      let a4 = this.controleur.coefficients.a4;
      let a6 = this.controleur.coefficients.a6;
      let p = this.controleur.coefficients.p;

      let highlightColor = 'cyan';
      let generalEquationModulo = 'y^2 + {\\color{' + highlightColor + '}a_1} xy + {\\color{' + highlightColor + '}a_3}y \\underset{p}\\equiv \\newline x^3 + {\\color{' + highlightColor + '}a_2} x^2 + {\\color{' + highlightColor + '}a_4} x + {\\color{' + highlightColor + '}a_6}';
      let generalEquationReels = 'y^2 + {\\color{' + highlightColor + '}a_1} xy + {\\color{' + highlightColor + '}a_3}y = \\newline x^3 + {\\color{' + highlightColor + '}a_2} x^2 + {\\color{' + highlightColor + '}a_4} x + {\\color{' + highlightColor + '}a_6}';
      let actualEquationModulo = 'y^2 + {\\color{' + highlightColor + '}' + a1 + '} xy + {\\color{' + highlightColor + '}' + a3 + '}y \\underset{' + p + '}\\equiv \\newline x^3 + {\\color{' + highlightColor + '}' + a2 + '}x^2 + {\\color{' + highlightColor + '}' + a4 + '}x + {\\color{' + highlightColor + '}' + a6 + '}';
      let actualEquationReels = 'y^2 + {\\color{' + highlightColor + '}' + a1 + '} xy + {\\color{' + highlightColor + '}' + a3 + '}y =\\newline x^3 + {\\color{' + highlightColor + '}' + a2 + '}x^2 + {\\color{' + highlightColor + '}' + a4 + '}x + {\\color{' + highlightColor + '}' + a6 + '}';

      let generalEquation = actualCorps == "Modulo" ? generalEquationModulo : generalEquationReels;
      let actualEquation = actualCorps == "Modulo" ? actualEquationModulo : actualEquationReels;

      //let discriminantGeneralEquation = 'Δ = -16 * (4a^3 + 27b^2)';
      //let discriminantResult = 'Δ = ' + String((-16) * (4 * Math.pow(a, 3) + 27 * Math.pow(b, 2)));

      // Display latex  
      this.menuS.displayLaTeX('Weierstrass-general-equation', generalEquation);
      this.menuS.displayLaTeX('Weierstrass-actual-equation', actualEquation);

      //this.menuS.displayLaTeX('Weierstrass-general-discriminant', discriminantGeneralEquation);
      //this.menuS.displayLaTeX('Weierstrass-actual-discriminant', discriminantResult);
    },
    displayNewCurve() {
      let a1 = this.menuS.getFloatFromInputId("a1-Weierstrass");
      let a2 = this.menuS.getFloatFromInputId("a2-Weierstrass");
      let a3 = this.menuS.getFloatFromInputId("a3-Weierstrass");
      let a4 = this.menuS.getFloatFromInputId("a4-Weierstrass");
      let a6 = this.menuS.getFloatFromInputId("a6-Weierstrass");
      this.graphS.displayWeierstrass(a1, a3, a2, a4, a6);
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

        this.menuS.setInputValueFromGraphExpValue("a1-Weierstrass", "a_{1}");
        this.menuS.setInputValueFromGraphExpValue("a2-Weierstrass", "a_{2}");
        this.menuS.setInputValueFromGraphExpValue("a3-Weierstrass", "a_{3}");
        this.menuS.setInputValueFromGraphExpValue("a4-Weierstrass", "a_{4}");
        this.menuS.setInputValueFromGraphExpValue("a6-Weierstrass", "a_{6}");

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