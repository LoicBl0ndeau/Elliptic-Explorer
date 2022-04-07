<template>
  <div class="submenu">
    <h3 class="section">Parameters</h3>

    <span class="parameter">
      <label>C</label>
      <input id="C" value="3" @input="changeC" /><br />
    </span>

    <span class="parameter">
      <label>D</label>
      <input id="D" value="10" @input="changeD" /><br />
    </span>

    <h3 class="section">Operations</h3>

    <span class="parameter">
      <select name="choix-operation" id="choix-op-edwards">
        <option selected="yes">Addition</option>
        <!-- <option>Double</option> -->
        </select><br />
    </span>

    <!-- <div id="double">
      <span class="parameter">
        <label>Factor</label><br />
        <input id="factor" value="2" />
        <button @click="newMul" >Compute</button>
    </span>
    </div> -->
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";
import { edwardsStore } from "@/stores/edwards";

export default {
  name: "MenuMont",
  setup() {
    const graphS = graphStore();
    const edwards = edwardsStore();

    return { graphS, edwards };
  },
  mounted() {
    this.listenOnOperationChangeOption();
  },
  methods: {
    listenOnOperationChangeOption() {
      // cacher la multiplication par défaut
      document.getElementById("double").style.display = "none";

      // // à lécoute des changements d'operation
      // document.getElementById("choix-op-edwards").addEventListener("change", (event) => {
      //   this.graphS.destroy();
      //   this.displayCurve();
      //   // actions
      //   if (event.target.value == "Double") {
      //     document.getElementById("double").style.display = "inline";
      //     this.edwards.showDouble();
      //   }
      //   else {
      //     document.getElementById("double").style.display = "none";
      //     this.edwards.showAddition();
      //   }
      // });
    },
    getC () {
      return document.getElementById("C").value;
    },
    getD () {
      return document.getElementById("D").value;
    },
    changeC () {
      this.graphS.setParam("c", Number.parseFloat(this.getC()));
    },
    changeD () {
      this.graphS.setParam("d", Number.parseFloat(this.getD()));
    },
    displayCurve() {
      let C = Number.parseFloat(this.getC());
      let D = Number.parseFloat(this.getD());
      this.edwards.create(C, D);
    },
    displayOperation() {
      this.displayCurve();
      let op = document.getElementById("choix-op-weierstrass").value;
      if (op == "Addition") {
        this.edwards.showAddition();
      }
    },
    // newMul() {
    //   console.log("not supported so far");
    // }
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>