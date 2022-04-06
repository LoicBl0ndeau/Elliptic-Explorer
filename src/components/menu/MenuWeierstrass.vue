<template>
  <div class="submenu">
    <h3 class="section">Paramètres</h3>

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
      <input id="a2" value="0" @input="changeA2" /><br />
    </span>

    <span class="parameter">
      <label>a4</label>
      <input id="a4" value="2" @input="changeA4" /><br />
    </span>

    <span class="parameter">
      <label>a6</label>
      <input id="a6" value="1" @input="changeA6" /><br />
    </span>

    <div class="button" id="button-6" @click="generate">
      <div id="spin"></div>
      <a href="#">AFFICHER!</a>
    </div>

    <h3 class="section">Opérations</h3>

    <span class="parameter">
      <select name="choix-operation" id="choix-op-weierstrass">
        <option selected="yes">Addition</option>
        <option>Multiplication</option></select
      ><br />
    </span>

    <div id="multiplication">
      <span class="parameter">
        <label>Facteur </label><br />
        <input id="factor" value="2" />
        <button @click="newMul" >Compute</button>
    </span>
    </div>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";

export default {
  name: "MenuParametreShort",
  setup() {
    const graph = graphStore();

    return { graph };
  },
  mounted() {
    this.listenOnOperationChangeOption();
  },
  methods: {
    listenOnOperationChangeOption() {
      // cacher la multiplication par défaut
      document.getElementById("multiplication").style.display = "none";

      // à lécoute des changements d'operation
      document.getElementById("choix-op-weierstrass").addEventListener("change", (event) => {
        this.graph.weierstrass.destroy();
        this.generate();
        // actions
        if (event.target.value == "Multiplication") {
          document.getElementById("multiplication").style.display = "inline";
          this.graph.weierstrass.showMul(3);
        }
        else {
          document.getElementById("multiplication").style.display = "none";
          this.graph.weierstrass.showAddition(2);
        }
      });
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
    getFactor() {
      return document.getElementById("factor").value;
    },
    changeA1() {
      this.graph.weierstrass.setParam("a_{1}", Number.parseFloat(this.getA1()));
    },
    changeA3() {
      this.graph.weierstrass.setParam("a_{3}", Number.parseFloat(this.getA3()));
    },
    changeA2() {
      this.graph.weierstrass.setParam("a_{2}", Number.parseFloat(this.getA2()));
    },
    changeA4() {
      this.graph.weierstrass.setParam("a_{4}", Number.parseFloat(this.getA4()));
    },
    changeA6() {
      this.graph.weierstrass.setParam("a_{6}", Number.parseFloat(this.getA6()));
    },
    generate() {
      let a1 = Number.parseFloat(this.getA1());
      let a3 = Number.parseFloat(this.getA3());
      let a2 = Number.parseFloat(this.getA2());
      let a4 = Number.parseFloat(this.getA4());
      let a6 = Number.parseFloat(this.getA6());
      this.graph.weierstrass.create(a1, a3, a2, a4, a6);
    },
    newMul() {
      this.graph.weierstrass.destroy();
      this.generate();
      let k = Number.parseFloat(this.getFactor())
      this.graph.weierstrass.showMul(k);
    }
  },
  data: function () {
    return {
      a_param: [],
      parametres: false,
      valeurA: "",
      valeurB: "",
      valeurP: "",
    };
  },
};
</script>

<style lang="css" scoped >
@import "@/css/submenu.css";
</style>