<template>
  <div class="submenu">
    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>a1</label>
      <input id="a1" value="0" @input="changeA1" /><br />
    </span>

    <span class="parameter">
      <label>a3</label>
      <input id="a3" value="0" @input="changeA3" /><br />
    </span>

    <span class="parameter">
      <label>a2</label>
      <input id="a2" value="4" @input="changeA2" /><br />
    </span>

    <span class="parameter">
      <label>a4</label>
      <input id="a4" value="2" @input="changeA4" /><br />
    </span>

    <span class="parameter">
      <label>a6</label>
      <input id="a6" value="1" @input="changeA6" /><br />
    </span>

    <div class="button" id="button-6" @click="displayOperation">
      <div id="spin"></div>
      <a href="#">DISPLAY</a>
    </div>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select
        name="choix-operation"
        id="choix-op-weierstrass"
        @change="displayChoosenOption"
      >
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <div id="addition">
      <span class="parameter">
        <label>x1</label>
        <input id="x1" value="0" @input="changeX1"/><br />
      </span>
      <span class="parameter">
        <label>x2</label>
        <input id="x2" value="2" @input="changeX2"/><br />
      </span>
    </div>

    <div id="multiplication" style="display: none;">
      <span class="parameter">
        <label>x0</label>
        <input id="x0" value="0" @input="changeX0"/><br />
      </span>
      <span class="parameter">
        <label>Factor</label>
        <input id="factor" value="2" style="width: 40px;"/>
        <button @click="newMul">Compute</button>
      </span>
    </div>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { weierstrassStore } from "@/stores/weierstrass";

export default {
  name: "MenuParametreShort",
  setup() {
    const graphS = graphStore();
    const weierstrass = weierstrassStore();

    return { graphS, weierstrass };
  },
  methods: {
    displayChoosenOption() {
      this.graphS.destroy();
      this.displayCurve();
      let op = document.getElementById("choix-op-weierstrass").value;
      // actions
      if (op == "Multiplication") {
        // remove addition elem from page
        document.getElementById('addition').style.display = "none";
        document.getElementById("multiplication").style.display = "inline";
        let k = Number.parseFloat(this.getFactor());
        this.weierstrass.showMul(k);
      } else {
        document.getElementById("multiplication").style.display = "none";
        document.getElementById("addition").style.display = "inline";
        this.weierstrass.showAddition();
      }
    },
    getA1() {
      return document.getElementById("a1").value;
    },
    getA3() {
      return document.getElementById("a3").value;
    },
    getA2() {
      return document.getElementById("a2").value;
    },
    getA4() {
      return document.getElementById("a4").value;
    },
    getA6() {
      return document.getElementById("a6").value;
    },
    getX0() {
      return document.getElementById("x0").value;
    },
    getX1() {
      return document.getElementById("x1").value;
    },
    getX2() {
      return document.getElementById("x2").value;
    },
    getFactor() {
      return document.getElementById("factor").value;
    },
    changeA1() {
      this.graphS.setParam("a_{1}", Number.parseFloat(this.getA1()));
    },
    changeA3() {
      this.graphS.setParam("a_{3}", Number.parseFloat(this.getA3()));
    },
    changeA2() {
      this.graphS.setParam("a_{2}", Number.parseFloat(this.getA2()));
    },
    changeA4() {
      this.graphS.setParam("a_{4}", Number.parseFloat(this.getA4()));
    },
    changeA6() {
      this.graphS.setParam("a_{6}", Number.parseFloat(this.getA6()));
    },
    changeX0() {
      this.graphS.setParam("x_{1}", Number.parseFloat(this.getX0()));
    },
    changeX1() {
      this.graphS.setParam("x_{1}", Number.parseFloat(this.getX1()));
    },
    changeX2() {
      this.graphS.setParam("x_{2}", Number.parseFloat(this.getX2()));
    },
    
    displayCurve() {
      let a1 = Number.parseFloat(this.getA1());
      let a3 = Number.parseFloat(this.getA3());
      let a2 = Number.parseFloat(this.getA2());
      let a4 = Number.parseFloat(this.getA4());
      let a6 = Number.parseFloat(this.getA6());
      this.weierstrass.create(a1, a3, a2, a4, a6);
    },
    displayOperation() {
      this.displayCurve();
      let op = document.getElementById("choix-op-weierstrass").value;
      if (op == "Addition") {
        this.weierstrass.showAddition();
      }
      if (op == "Multiplication") {
        let k = Number.parseFloat(this.getFactor());
        this.weierstrass.showMul(k);
      }
    },
    newMul() {
      // in order to keep the same point position
      let currentPointXPos = Number.parseFloat(
        this.graphS.graph.getValueOfParameter("x_{1}")
      );
      this.graphS.destroy();
      this.displayCurve();
      let k = Number.parseFloat(this.getFactor());
      this.weierstrass.showMul(currentPointXPos, k);
    },
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>