<template>
  <div class="submenu">

    <h3 class="section">Curve Equation</h3>
    <div id="Short_Weierstrass-general-equation"></div>
    <div id="Short_Weierstrass-actual-equation"></div>

    <h3 class="section">Discriminant</h3>
    <div id="Short_Weierstrass-general-discriminant"></div>
    <div id="Short_Weierstrass-actual-discriminant"></div>

    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a</label>
      <input id="a" type="number" @change="setCoefficient('a')" />
      <br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input id="b" type="number" @change="setCoefficient('b')" />
      <br />
    </span>

    <span class="parameter" id="p_container">
      <label>p</label>
      <input id="p" type="number" placeholder="Prime number" @change="setCoefficient('p')" />
      <br />
    </span>

    <!-- Qu'est ce que ce bouton fait ? -->
    <button @click="displayNewCurve">List Points</button>
    <br>

    <!-- Qu'est ce que ce bouton fait ? -->
    <button id="update">Update the display</button>

    <h3 class="section">
      Curve view
      <!-- Rounded switch -->
      <label class="switch">
        <input type="checkbox" id="periodic-toggle">
        <span class="slider round"></span>
      </label>
    </h3>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select id="choix-op-shortp" @change="displayCurveWithSelectedOperation">
        <option selected="yes">Addition</option>
        <option disabled>Multiplication</option>
      </select>
      <br />
    </span>

    <!-- Opérations sur le corps "Réels"-->
    <span class="parameter">
      <label>(x1, y1)</label>
      <input id="x1-y1-shortp" value="" readonly />
    </span>

    <div id="addition-short">
      <span class="parameter">
        <label>(x2, y2)</label>
        <input id="x2-y2-short" readonly />
      </span>
    </div>

    <div id="multiplication-short" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input type="number" id="factor-short" value="2" style="width: 40px" />
        <button>Compute</button><br />
      </span>
    </div>

    <!-- Opérations sur le corps "Modulo p" -->
    <div id="addition-shortp">
      <span class="parameter">
        <label>(x2, y2)</label>
        <input id="x2-y2-shortp" readonly />
      </span>
    </div>

    <div id="multiplication-shortp" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input type="number" id="factor-shortp" value="2" style="width: 40px" />
        <button>Compute</button><br />
      </span>
    </div>

    <h3 class="section">Result</h3>
    <span class="parameter">
      <span id="result-x-y-shortmodp" class="result"></span><br />
    </span>

  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { menuStore } from "@/stores/menu.js";
export default {
  name: "MenuShortWeierstrass",
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
      this.setAndDisplayInputsValue(); // Semble être ok pour le moment, à vérifier en changeant la valeur des inputs par une autre forme
      this.updateLatexDisplay();
    },
    setCoefficient(coefName) {
      let value = document.getElementById(coefName).value;
      this.controleur.coefficients.setCoef(coefName, value);
      this.updateLatexDisplay();
      this.controleur.getInformations();
    },
    setAndDisplayInputsValue() {
      let a = this.controleur.coefficients.a;
      let b = this.controleur.coefficients.b;
      let p = this.controleur.coefficients.p;

      document.getElementById('a').value = a;
      document.getElementById('b').value = b;
      document.getElementById('p').value = p;

      let displayValue = this.controleur.getCorps() == "Modulo" ? "block" : "none";
      document.getElementById('p_container').style.display = displayValue;
    },
    updateLatexDisplay() {
      let actualCorps = this.controleur.getCorps();

      let a = this.controleur.coefficients.a
      let b = this.controleur.coefficients.b
      let p = this.controleur.coefficients.p

      let generalEquation = actualCorps == "Modulo" ? 'y^2 \\underset{p}\\equiv  x^3 + ax + b' : 'y^2 =  x^3 + ax + b';
      let actualEquation = actualCorps == "Modulo" ? 'y^2 \\underset{' + p + '}\\equiv  x^3 + ' + a + 'x + ' + b : 'y^2 =  x^3 + ' + a + 'x + ' + b;

      let discriminantGeneralEquation = 'Δ = -16 * (4a^3 + 27b^2)';
      let discriminantResult = 'Δ = ' + String((-16) * (4 * Math.pow(a, 3) + 27 * Math.pow(b, 2)));

      // Display latex  
      this.menuS.displayLaTeX('Short_Weierstrass-general-equation', generalEquation);
      this.menuS.displayLaTeX('Short_Weierstrass-actual-equation', actualEquation);

      this.menuS.displayLaTeX('Short_Weierstrass-general-discriminant', discriminantGeneralEquation);
      this.menuS.displayLaTeX('Short_Weierstrass-actual-discriminant', discriminantResult);
    },
    displayDefaultCurve() {
      this.graphS.displayShortPeriodic(2, 1, 5);
      this.menuS.setValueById("ap", 2);
      this.menuS.setValueById("bp", 1);
      this.menuS.setValueById("pp", 5);
      // Display Latex
      this.menuS.displayLaTeX('Short_Weierstrass-', 'y^2 \\underset{5}\\equiv  x^3 + 2x + 1');
      this.menuS.displayLaTeX('Short_Weierstrass-actual-discriminant', `~~~~~= -944`);
      // enables add on click
      this.graphS.getGraph.addClickPoints();
      window.setInterval(this.enableAdditionOnClick, 500);    // important pour détecter les clicks
    },
    displayNewCurve() {
      let a = this.menuS.getIntFromInputId("ap");
      let b = this.menuS.getIntFromInputId("bp");
      let p = this.menuS.getIntFromInputId("pp");
      if (this.menuS.isPrime(p)) {
        this.menuS.displayLaTeX('Short_Weierstrass-', 'y^2 \\underset{' + p + '}\\equiv  x^3 + ' + a + 'x + ' + b);
        this.menuS.displayLaTeX('Short_Weierstrass-actual-discriminant', `~~~~~= ${-16 * (4 * a ** 3 + 27 * b ** 2)}`);
        this.graphS.displayShortPeriodic(a, b, p);
        this.graphS.getGraph.addClickPoints();
      }
      else {
        alert("p must be a prime number");
      }
    },
    enableAdditionOnClick() {
      try {
        this.menuS.setValueById(
          "x1-y1-shortp",
          `(${this.graphS.getGraph.selectedPoints[0][0]}, ${this.graphS.getGraph.selectedPoints[0][1]})`
        );
        this.menuS.setValueById(
          "x2-y2-shortp",
          `(${this.graphS.getGraph.selectedPoints[1][0]}, ${this.graphS.getGraph.selectedPoints[1][1]})`
        );
      } catch (err) {
        // console.log(err);
      }
    },
    displayCurveWithSelectedOperation() {
      this.displayNewCurve();
      let op = this.menuS.getValueById("choix-op-shortp");
      if (op == "Addition") {
        this.menuS.hideElementById("multiplication-shortp");
        this.menuS.displayElementById("addition-shortp");
      }
      if (op == "Multiplication") {
        this.menuS.displayElementById("multiplication-shortp");
        this.menuS.hideElementById("addition-shortp");
      }
    },
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>