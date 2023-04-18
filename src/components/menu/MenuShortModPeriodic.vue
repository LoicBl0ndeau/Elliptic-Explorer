<template>
  <div class="submenu">

    <h3 class="section">General Curve Equation</h3>
    <div id="SMP-general-equation"></div>

    <h3 class="section">Actual Curve Equation</h3>
    <div id="SMP-actual-equation"></div>

    <h3 class="section">General Discriminant</h3>
    <div id="SMP-general-discriminant"></div>

    <h3 class="section">Discriminant result</h3>
    <div id="SMP-actual-discriminant"></div>

    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a</label>
      <input type="number" id="ap" />
      <br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input id="bp" type="number" value={{this.controleur.coefficients.a}}><br />
    </span>

    <span class="parameter">
      <label>p</label>
      <input type="number" id="pp" placeholder="prime number" value={{controleur.coefficients.p}} /><br />
    </span>
    <button @click="displayNewCurve">List Points</button>

    <br>
    <button id="update">Update</button>


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
      </select><br />
    </span>

    <span class="parameter">
      <label>(x1, y1)</label>
      <input id="x1-y1-shortp" value="" readonly />
    </span>

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
  name: "MenuShortModPeriodic",
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
  // Faire une fonction qui set les valeurs des inputs a,b,p avec les valeurs du controlleur
  mounted() {

    // update des valeurs dans le menu toutes les 500ms
    setInterval(this.updateMenuInputWithGraphValue, 500);
    // Display latex  
    this.menuS.displayLaTeX('SMP-general-equation', 'y^2 \\underset{p}\\equiv  x^3 + ax + b');
    this.menuS.displayLaTeX('SMP-general-discriminant', 'Δ = -16 * (4a^3 + 27b^2)');

    this.menuS.displayLaTeX('SMP-actual-equation', 'y^2 \\underset{' + this.controleur.coefficients.p + '}\\equiv  x^3 + ' + this.controleur.coefficients.a + 'x + ' + this.controleur.coefficients.b);
    this.menuS.displayLaTeX('SMP-actual-discriminant', 'Δ = ' + (-16) * (4 * Math.pow(this.controleur.coefficients.a, 3) + 27 * Math.pow(+this.controleur.coefficients.b, 2)));
  },

  methods: {
    displayDefaultCurve() {
      this.graphS.displayShortPeriodic(2, 1, 5);
      this.menuS.setValueById("ap", 2);
      this.menuS.setValueById("bp", 1);
      this.menuS.setValueById("pp", 5);
      // Display Latex
      this.menuS.displayLaTeX('SMP-', 'y^2 \\underset{5}\\equiv  x^3 + 2x + 1');
      this.menuS.displayLaTeX('SMP-actual-discriminant', `~~~~~= -944`);
      // enables add on click
      this.graphS.getGraph.addClickPoints();
      window.setInterval(this.enableAdditionOnClick, 500);    // important pour détecter les clicks
    },
    displayNewCurve() {
      let a = this.menuS.getIntFromInputId("ap");
      let b = this.menuS.getIntFromInputId("bp");
      let p = this.menuS.getIntFromInputId("pp");
      if (this.menuS.isPrime(p)) {
        this.menuS.displayLaTeX('SMP-', 'y^2 \\underset{' + p + '}\\equiv  x^3 + ' + a + 'x + ' + b);
        this.menuS.displayLaTeX('SMP-actual-discriminant', `~~~~~= ${-16 * (4 * a ** 3 + 27 * b ** 2)}`);
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