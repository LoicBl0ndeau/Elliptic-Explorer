<template>
  <div class="submenu">

    <h3 class="section">Curve Equation</h3>
    
    <div id="short-eq" ></div>

    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a</label>
      <input id="a" /><br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input id="b" /><br />
    </span>

    <span class="parameter">
      <label>p</label>
      <input id="p" placeholder="prime number"/><br />
    </span>
    <button @click="displayNewCurve">List Points</button>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select id="choix-op-short" @change="displayCurveWithSelectedOperation">
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <span class="parameter">
      <label>(x1, y1)</label>
      <input id="x1-y1-short" value="" readonly/>
    </span>

    <div id="addition-short">
      <span class="parameter">
        <label>(x2, y2)</label>
        <input id="x2-y2-short" readonly/>
      </span>
    </div>

    <div id="multiplication-short" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input
          type="number"
          id="factor-short" 
          value="2"
          style="width: 40px" />
        <button>Compute</button><br />
      </span>
    </div>

  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { menuStore } from "@/stores/menu.js";

export default {
  name: "MenuShort",
  setup() {
    const graphS = graphStore();
    const menuS = menuStore();

    return { graphS, menuS };
  },
  mounted() {
    // update des valeurs dans le menu toutes les 500ms
    setInterval(this.updateMenuInputWithGraphValue, 500);
    // display latex
    this.menuS.displayLaTeX('short-eq', 'y^2 \\underset{p}\\equiv  x^3 + ax + b');
  },
  methods: {
    displayDefaultCurve() {
      this.graphS.displayShort(2, 1, 5);
      this.menuS.setValueById("a", 2);
      this.menuS.setValueById("b", 1);
      this.menuS.setValueById("p", 5);
      // enables add on click
      this.graphS.getGraph.addClickPoints();
      window.setInterval(this.enableAdditionOnClick, 500);    // important pour détecter les clicks
    },
    displayNewCurve() {
      let a = this.menuS.getIntFromInputId("a");
      let b = this.menuS.getIntFromInputId("b");
      let p = this.menuS.getIntFromInputId("p");
      this.graphS.displayShort(a, b, p);
      this.graphS.getGraph.addClickPoints();
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