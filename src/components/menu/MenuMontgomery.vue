<template>
  <div class="submenu">

    <h3 class="section">Curve Equation</h3>
    <div id="Montgomery-general-equation"></div>
    <div id="Montgomery-actual-equation"></div>

    <!-- <h3 class="section">Discriminant</h3> -->
    <div id="Montgomery-general-discriminant"></div>
    <div id="Montgomery-actual-discriminant"></div>

    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <span id="a-error-mess-montgomery"></span>
      <label>a</label>
      <input id="a-Montgomery" type="number" @change="setCoefficient('a-Montgomery')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('A', 'a-Montgomery'); verifyA();" -->
      <br />
    </span>

    <span class="parameter">
      <span id="b-error-mess-montgomery"> </span>
      <label>b</label>
      <input id="b-Montgomery" type="number" @change="setCoefficient('b-Montgomery')" />
      <!-- @input="menuS.setValueOnGraphFromUserInput('B', 'b-Montgomery'); verifyB();" -->
      <br />
    </span>

    <span class="parameter" id="p_container_Montgomery">
      <label>p</label>
      <input id="p-Montgomery" type="number" placeholder="Prime number" @change="setCoefficient('p-Montgomery')" />
      <br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select id="choix-op-montgomery" @change="displayCurveWithSelectedOperation">
        <option selected="yes">Addition</option>
        <option>Multiplication</option>
      </select><br />
    </span>

    <span class="parameter">
      <label id="pointP">P.x</label>
      <input id="x1-montgomery" type="number" class="coord"
        @input="menuS.setValueOnGraphFromUserInput('x_{1}', 'x1-montgomery')" />
      <button @click="graphS.switchPointOrdinate(1)">Switch</button><br />
    </span>

    <div id="addition-montgomery">
      <span class="parameter">
        <label>Q.x</label>
        <input id="x2-montgomery" type="number" class="coord"
          @input="menuS.setValueOnGraphFromUserInput('x_{2}', 'x2-montgomery')" />
        <button @click="graphS.switchPointOrdinate(2)">Switch</button><br />
      </span>
    </div>

    <div id="multiplication-montgomery" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input type="number" id="factor-montgomery" value="2" style="width: 40px" />
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
      let coefName = inputId[0];
      if(this.verifyA() && this.verifyB()){
        this.controleur.coefficients.setCoef(coefName, value);
        this.updateLatexDisplay();
        this.displayNewCurve();
      }
    },
    setAndDisplayInputsValue() {
      let a = this.controleur.coefficients.a;
      let b = this.controleur.coefficients.b;
      let p = this.controleur.coefficients.p;

      document.getElementById('a-Montgomery').value = a;
      document.getElementById('b-Montgomery').value = b;
      document.getElementById('p-Montgomery').value = p;

      let displayValue = this.controleur.getCorps() == "Modulo" ? "block" : "none";
      document.getElementById('p_container_Montgomery').style.display = displayValue;
    },
    updateLatexDisplay() {
      let actualCorps = this.controleur.getCorps();

      let a = this.controleur.coefficients.a
      let b = this.controleur.coefficients.b
      let p = this.controleur.coefficients.p

      let highlightColor = 'cyan';
      let generalEquationModulo = '{\\color{' + highlightColor + '}a}y^2 \\underset{p}\\equiv x^3 + {\\color{' + highlightColor + '}b}x^2 + x';
      let generalEquationReels = '{\\color{' + highlightColor + '}a}y^2 = x^3 + {\\color{' + highlightColor + '}b}x^2 + x';
      let actualEquationModulo = '{\\color{' + highlightColor + '}' + a + '}y^2 \\underset{' + p + '}\\equiv x^3 + {\\color{' + highlightColor + '}' + b + '}x^2 + x';
      let actualEquationReels = '{\\color{' + highlightColor + '}' + a + '}y^2 = x^3 + {\\color{' + highlightColor + '}' + b + '}x^2 + x';


      let generalEquation = actualCorps == "Modulo" ? generalEquationModulo : generalEquationReels;
      let actualEquation = actualCorps == "Modulo" ? actualEquationModulo : actualEquationReels;

      //let discriminantGeneralEquation = 'Δ = ?(1 + d(x^2)(y^2))';
      //let discriminantResult = 'Δ = ' + String(?);

      // Display latex  
      this.menuS.displayLaTeX('Montgomery-general-equation', generalEquation);
      this.menuS.displayLaTeX('Montgomery-actual-equation', actualEquation);

      //this.menuS.displayLaTeX('Montgomery-general-discriminant', discriminantGeneralEquation);
      //this.menuS.displayLaTeX('Montgomery-actual-discriminant', discriminantResult);
    },
    displayNewCurve() {
      let a = this.menuS.getFloatFromInputId("a-Montgomery");
      let b = this.menuS.getFloatFromInputId("b-Montgomery");

      this.graphS.displayMontgomery(a, b);
      this.graphS.showAddition(-2, 1); // show a random addition on the graph
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
    verifyA() {
      let value = this.menuS.getFloatFromInputId('a-Montgomery');
      if (value <= 2 && value >= -2){
        this.menuS.displayLaTeX(
          "a-error-mess-montgomery",
          "\\color{yellow} a \\text{ must be defined such as : }\\newline a \\notin [-2, 2]\\newline");
        return false;
      }
      else if(this.menuS.getFloatFromInputId('b-Montgomery')*((value**2)-4) == 0){
        this.menuS.displayLaTeX(
          "a-error-mess-montgomery",
          "\\color{yellow} a \\text{ must be defined such as : }\\newline a \\notin \\{0, b^2-4\\}\\newline");
        return false;
      }
      this.menuS.displayLaTeX("a-error-mess-montgomery", "");
      return true;
    },
    verifyB() {
      let value = this.menuS.getFloatFromInputId('b-Montgomery');
      if (value == 0){
        this.menuS.displayLaTeX(
          "b-error-mess-montgomery",
          "\\color{yellow} b \\text{ must be non-null}\\newline");
        return false;
      }
      else if(value*((this.menuS.getFloatFromInputId('a-Montgomery')**2)-4) == 0){
        this.menuS.displayLaTeX(
          "b-error-mess-montgomery",
          "\\color{yellow} b \\text{ must be defined such as : }\\newline b \\notin \\{0, a^2-4\\}\\newline");
        return false;
      }
      this.menuS.displayLaTeX("b-error-mess-montgomery", "");
      return true;
    },
    updateMenuInputWithGraphValue() {
      try {
        // if graph not initialized yet
        if (this.graphS.getGraph == null) return;
        let op = this.menuS.getValueById("choix-op-montgomery");
        let result_x = null;
        let result_y = null;
        if (op == "Addition") {
          this.menuS.setInputValueFromGraphExpValue("x1-montgomery", "x_{1}");
          this.menuS.setInputValueFromGraphExpValue("x2-montgomery", "x_{2}");
          result_x = this.graphS.getExpValue(`x_{3}`);
          result_y = this.graphS.getExpValue(`y_{3}`);
        }
        if (op == "Multiplication") {
          this.menuS.setInputValueFromGraphExpValue("x1-montgomery", "x_{1}");
          let idResult = this.menuS.getIntFromInputId("factor");
          result_x = this.graphS.getExpValue(`x_{${idResult}}`);
          result_y = this.graphS.getExpValue(`y_{${idResult}}`);
        }
        document.getElementById("result-x-y-montgomery").innerHTML = `(${result_x.toFixed(2)},   ${result_y.toFixed(2)})`;
      } catch (err) {
          console.warn(err);
        return;
      }
    },
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>