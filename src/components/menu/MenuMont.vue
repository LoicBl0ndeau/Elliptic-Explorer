<template>
  <div class="submenu">
    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>A</label>
      <input id="A" value="3" @input="changeA" /><br />
    </span>

    <span class="parameter">
      <label>B</label>
      <input id="B" value="1" @input="changeB" /><br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select name="choix-operation" id="choix-op-montgomery">
        <option selected="yes">Addition</option>
        <option>Double</option></select
      ><br />
    </span>

    <div id="double">
      <span class="parameter">
        <!-- <label>Factor</label><br />
        <input id="factor" value="2" />
        <button @click="newMul" >Compute</button> -->
      </span>
    </div>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { montgomeryStore } from "@/stores/montgomery";

export default {
  name: "MenuMont",
  setup() {
    const graphS = graphStore();
    const montgomery = montgomeryStore();

    return { graphS, montgomery };
  },
  mounted() {
    this.listonOnChangeOperationOption();
  },
  methods: {
    listonOnChangeOperationOption() {
      // cacher la multiplication par défaut
      document.getElementById("double").style.display = "none";

      // à lécoute des changements d'operation
      document.getElementById("choix-op-montgomery").addEventListener("change", (event) => {
        this.graphS.destroy();
        this.displayCurve();
        // actions
        if (event.target.value == "Double") {
          document.getElementById("double").style.display = "inline";
          this.montgomery.showDouble();
        }
        else {
          document.getElementById("double").style.display = "none";
          this.montgomery.showAddition();
        }
      });
    },
    getA () {
      return document.getElementById("A").value;
    },
    getB () {
      return document.getElementById("B").value;
    },
    changeA () {
      this.graphS.setParam("A", Number.parseFloat(this.getA()));
    },
    changeB () {
      this.graphS.setParam("B", Number.parseFloat(this.getB()));
    },
    displayCurve() {
      let A = Number.parseFloat(this.getA());
      let B = Number.parseFloat(this.getB());
      this.montgomery.create(A, B);
    },
    displayOperation() {
      this.displayCurve();
      let op = document.getElementById("choix-op-montgomery").value;
      if (op == "Addition") {
        this.montgomery.showAddition();
      }
      if (op == "Double") {
        this.montgomery.showDouble();
      }
    },
    newMul() {
      this.graphS.destroy();
      this.displayCurve();
      this.montgomery.showDouble();
    }
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>