<template>
  <div class="submenu">
    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a</label>
      <input
        id="a"
      /><br />
    </span>

    <span class="parameter">
      <label>b</label>
      <input
        id="b"
      /><br />
    </span>

    <span class="parameter">
      <label>p</label>
      <input
        id="p"
      /><br />
    </span>
    <button @click="displayNewCurve">List Points</button>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select
        id="choix-op-short"
        @change="displayCurveWithSelectedOperation"
      >
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <span class="parameter">
      <label>x1</label>
      <input id="x1-short" value="graphS.getGraph.selectedPoints[0][0]"/>
    </span>

    <div id="addition-short">
      <span class="parameter">
        <label>x2</label>
        <input id="x2-short"/>
      </span>
    </div>

    <div id="multiplication-short" style="display: none">
      <span class="parameter">
        <label>Factor</label>
        <input id="factor-short" value="2" style="width: 40px" />
        <button >Compute</button><br />
      </span>
    </div>

    <h3 class="section">Result</h3>
    <span class="parameter">
      <label>x</label>
      <input id="result-x-short" readonly /><br />
      <label>y</label>
      <input id="result-y-short" readonly /><br />
    </span>
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
  },
  methods: {
    displayDefaultCurve() {
        this.graphS.displayShort(2, 1, 5);
        this.menuS.setValueById("a", 2);
        this.menuS.setValueById("b", 1);
        this.menuS.setValueById("p", 5);
    },
    displayNewCurve() {
      let a = this.menuS.getIntFromInputId("a");
      let b = this.menuS.getIntFromInputId("b");
      let p = this.menuS.getIntFromInputId("p");
      this.graphS.displayShort(a, b, p);
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