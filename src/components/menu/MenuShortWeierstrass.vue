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
      <input id="a4-ShortWeierstrass" type="number" @change="setCoefficient('a4-ShortWeierstrass')" />
      <br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input id="a6-ShortWeierstrass" type="number" @change="setCoefficient('a6-ShortWeierstrass')" />
      <br />
    </span>
    <div id="p_isNotPrime" style="display: none;">
      <span style="color: red;">p is not prime</span>
    </div>
    <span class="parameter" id="p_container_ShortWeierstrass">
      <label>p</label>
      <input id="p-ShortWeierstrass" type="number" placeholder="Prime number"
        @change="setCoefficient('p-ShortWeierstrass')" />
      <br />
    </span>

    <button id="updateCurveDisplay" @click="displayNewCurve">Update curve display</button>
    <br>

    <span id="update_for_periodic" style="display: none;">
      <button id="update">Update</button>
    </span>

    <h3 class="section container_curve-toggle" id="container_curve-toggle-finite">
      Curve view
      <!-- Rounded switch -->
      <label class="switch">
        <input type="checkbox" id="curve-toggle-finite">
        <span class="slider round"></span>
      </label>
    </h3>
    <h3 class="section container_curve-toggle" style="display: none;" id="container_curve-toggle-periodic">
      Curve view
      <!-- Rounded switch -->
      <label class="switch">
        <input type="checkbox" id="curve-toggle-periodic">
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
      <label id="pointPshort">(P.x, P.y)</label>
      <input id="x1-y1-shortp" value="" readonly />
    </span>

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
        <label>(Q.x, Q.y)</label>
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
      <span id="result-x-y-shortmod" class="result"></span><br />
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
    setInterval(this.enableAdditionOnClick, 500);
  },
  methods: {
    updateAll() {
      this.setAndDisplayInputsValue();
      this.updateLatexDisplay();
    },
    setCoefficient(inputId) {
      let value = document.getElementById(inputId).value; //The value of the input (coeff)
      var coefName = inputId[0];
      if (coefName != 'p') {
        coefName = coefName + inputId[1];
        this.controleur.coefficients.setCoef(coefName, value);
        this.updateLatexDisplay();
      }
      else {
        if (this.menuS.isPrime(value)) {
          document.getElementById("p_isNotPrime").style.display = "none";
          this.controleur.coefficients.setCoef(coefName, value);
          this.updateLatexDisplay();
        }
        else {
          document.getElementById("p_isNotPrime").style.display = "block";
        }
      }
    },
    // Display the right inputs depending on the selected corps
    setAndDisplayInputsValue() {
      let a = this.controleur.coefficients.a4;
      let b = this.controleur.coefficients.a6;
      let p = this.controleur.coefficients.p;

      document.getElementById('a4-ShortWeierstrass').value = a;
      document.getElementById('a6-ShortWeierstrass').value = b;
      document.getElementById('p-ShortWeierstrass').value = p;
    },
    updateLatexDisplay() {
      let actualCorps = this.controleur.getCorps();

      let a = this.controleur.coefficients.a4;
      let b = this.controleur.coefficients.a6;
      let p = this.controleur.coefficients.p

      let highlightColor = 'cyan';
      let generalEquationModulo = 'y^2 \\underset{{\\color{' + highlightColor + '}p}}\\equiv  x^3 + {\\color{' + highlightColor + '}a}x + {\\color{' + highlightColor + '}b}';
      let generalEquationReels = 'y^2 =  x^3 + {\\color{' + highlightColor + '}a}x + {\\color{' + highlightColor + '}b}';
      let actualEquationModulo = 'y^2 \\underset{{\\color{' + highlightColor + '}' + p + '}}\\equiv  x^3 + {\\color{' + highlightColor + '}' + a + '}x + {\\color{' + highlightColor + '}' + b + '}';
      let actualEquationReels = 'y^2 =  x^3 + {\\color{' + highlightColor + '}' + a + '}x + {\\color{' + highlightColor + '}' + b + '}';

      let generalEquation = actualCorps == "Modulo" ? generalEquationModulo : generalEquationReels;
      let actualEquation = actualCorps == "Modulo" ? actualEquationModulo : actualEquationReels;

      let discriminantGeneralEquation = 'Δ = -16 * (4{\\color{' + highlightColor + '}a}^3 + 27{\\color{' + highlightColor + '}b}^2)';
      let discriminantResult = 'Δ = ' + String((-16) * (4 * Math.pow(a, 3) + 27 * Math.pow(b, 2)));

      // Display latex  
      this.menuS.displayLaTeX('Short_Weierstrass-general-equation', generalEquation);
      this.menuS.displayLaTeX('Short_Weierstrass-actual-equation', actualEquation);

      this.menuS.displayLaTeX('Short_Weierstrass-general-discriminant', discriminantGeneralEquation);
      this.menuS.displayLaTeX('Short_Weierstrass-actual-discriminant', discriminantResult);
    },
    displayNewCurve() {
      let a = this.controleur.coefficients.a4;
      let b = this.controleur.coefficients.a6;
      let p = this.controleur.coefficients.p;

      if (this.menuS.isPrime(p)) {
        this.controleur.getView() == "FiniteView" ? this.graphS.displayShort(a, b, p) : this.graphS.displayShortPeriodic(a, b, p);
        this.graphS.getGraph.addClickPoints();
      } else {
        alert("p must be a prime number");
        document.getElementById('p-ShortWeierstrass').value = this.controleur.coefficients.p;
        document.getElementById("p_isNotPrime").style.display = "none";
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
        console.warn(err);
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