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
      <input id="a" value="3" type="number" />
      <br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input id="b" value="2" type="number" />
      <br />
    </span>

    <span class="parameter" id="p_span">
      <label>p</label>
      <input id="p" type="number" placeholder="prime number" value="5" /><br />
    </span>
    <button @click="displayNewCurve">List Points</button>

    <h3 class="section">
      Curve view
      <!-- Rounded switch -->
      <label class="switch">
        <input type="checkbox" id="curve-toggle">
        <span class="slider round"></span>
      </label>
    </h3>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select id="choix-op-short" @change="displayCurveWithSelectedOperation">
        <option selected="yes">Addition</option>
        <option disabled>Multiplication</option>
      </select><br />
    </span>

    <span class="parameter">
      <label>(x1, y1)</label>
      <input id="x1-y1-short" value="" readonly />
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
  name: "MenuShort",
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
    this.setInputValue();
    this.updateLatexDisplay();

    //console.log(JSON.parse(JSON.stringify(this.method)))
    //this.methods.updateLatexDisplay();
  },
  methods: {
    test() {
      console.log("tu m'as appellé papa");
    },
    setInputValue() {
      let a = this.controleur.coefficients.a;
      let b = this.controleur.coefficients.b;

      document.getElementById('a').value = a;
      document.getElementById('b').value = b;
    },
    updateLatexDisplay() {
      console.log("updateLatex Short_Weierstrass")
      let a = this.controleur.coefficients.a
      let b = this.controleur.coefficients.b
      let discriminantResult = (-16) * (4 * Math.pow(a, 3) + 27 * Math.pow(b, 2));

      // Display latex  
      this.menuS.displayLaTeX('Short_Weierstrass-general-equation', 'y^2 =  x^3 + ax + b');
      this.menuS.displayLaTeX('Short_Weierstrass-actual-equation', 'y^2 =  x^3 + ' + a + 'x + ' + b);

      this.menuS.displayLaTeX('Short_Weierstrass-general-discriminant', 'Δ = -16 * (4a^3 + 27b^2)');
      this.menuS.displayLaTeX('Short_Weierstrass-actual-discriminant', 'Δ = ' + discriminantResult);

    },
    setCoefficient(coef) {
      this.controleur.coefficients.setCoef(coef, parseInt(document.getElementById(coef).value));
      console.log(this.controleur.coefficients.getShortWeierstrassCoefficients())
    },
    displayDefaultCurve() {
      /*
      a = this.controleur.coefficients.a;
      b = this.controleur.coefficients.b;
      p = this.controleur.coefficients.p;

      this.graphS.displayShort(a, b, p);
      this.menuS.setValueById("a", a);
      this.menuS.setValueById("b", b);
      this.menuS.setValueById("p", p);
      */

      /*
      this.graphS.displayShort(2, 1, 5);
      this.menuS.setValueById("a", 2);
      this.menuS.setValueById("b", 1);
      this.menuS.setValueById("p", 5);
      */

      // TODO : Peut etre le laisser pour actualiser


      // enables add on click
      this.graphS.getGraph.addClickPoints();
      window.setInterval(this.enableAdditionOnClick, 500);    // important pour détecter les clicks
    },
    displayNewCurve() {
      if (this.menuS.isPrime(document.getElementById('p').value)) {
        this.setCoefficient('a');
        this.setCoefficient('b');
        this.setCoefficient('p');
        let a = this.controleur.coefficients.a;
        let b = this.controleur.coefficients.b;
        let p = this.controleur.coefficients.p;
        if (this.controleur.getCorps() == "Modulo") {
          this.menuS.displayLaTeX('short-eq', 'y^2 \\underset{' + p + '}\\equiv  x^3 + ' + a + 'x + ' + b);
        }
        else {
          this.menuS.displayLaTeX('short-eq', `y^2 = x^3 + ${a}x + ${b}`);
        }
        this.menuS.displayLaTeX('discriminant-short-res', `~~~~~= ${-16 * (4 * a ** 3 + 27 * b ** 2)}`);
        console.log(this.controleur.coefficients);
        this.graphS.displayShort(a, b, p);
        this.graphS.getGraph.addClickPoints();
      }
      else {
        alert("p must be a prime number");
        document.getElementById('p').value = this.controleur.coefficients.p;
      }
    },
    enableAdditionOnClick() {
      try {
        this.menuS.setValueById(
          "x1-y1-short",
          `(${this.graphS.getGraph.selectedPoints[0][0]}, ${this.graphS.getGraph.selectedPoints[0][1]})`
        );
        this.menuS.setValueById(
          "x2-y2-short",
          `(${this.graphS.getGraph.selectedPoints[1][0]}, ${this.graphS.getGraph.selectedPoints[1][1]})`
        );
      } catch (err) {
        // console.log(err);
      }
    },
    displayCurveWithSelectedOperation() {
      this.displayNewCurve();
      let op = this.menuS.getValueById("choix-op-short");
      if (op == "Addition") {
        this.menuS.hideElementById("multiplication-short");
        this.menuS.displayElementById("addition-short");
      }
      if (op == "Multiplication") {
        this.menuS.displayElementById("multiplication-short");
        this.menuS.hideElementById("addition-short");
      }
    },
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>