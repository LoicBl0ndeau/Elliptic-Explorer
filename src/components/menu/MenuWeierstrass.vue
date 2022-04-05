<template>
  <div class="weirstrass">
      <p>
        <label>a1 : </label>
        <input id="a1" value="0" @input="changeA1"/><br/>
        <label>a3 : </label>
        <input id="a3" value="0" @input="changeA3"/><br/>
        <label>a2 : </label>
        <input id="a2" value="0" @input="changeA2"/><br/>
        <label>a4 : </label>
        <input id="a4" value="2" @input="changeA4"/><br/>
        <label>a6 : </label>
        <input id="a6" value="1" @input="changeA6"/><br/>
      </p>
      <p>
        <button value="Générer la courbe" @click="generate"> GENERER </button>
      </p>
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
  methods: {
    getA1 () {
      return document.getElementById("a1").value;
    },
    getA3 () {
      return document.getElementById("a3").value;
    },
    getA2 () {
      return document.getElementById("a2").value;
    },
    getA4 () {
      return document.getElementById("a4").value;
    },
    getA6 () {
      return document.getElementById("a6").value;
    },
    changeA1 () {
      this.graph.weierstrass.setParam("a_{1}", Number.parseInt(this.getA1()));
    },
    changeA3 () {
      this.graph.weierstrass.setParam("a_{3}", Number.parseInt(this.getA3()));
    },
    changeA2 () {
      this.graph.weierstrass.setParam("a_{2}", Number.parseInt(this.getA2()));
    },
    changeA4 () {
      this.graph.weierstrass.setParam("a_{4}", Number.parseInt(this.getA4()));
    },
    changeA6 () {
      this.graph.weierstrass.setParam("a_{6}", Number.parseInt(this.getA6()));
    },
    generate () {
      let a1 = Number.parseInt(this.getA1());
      let a3 = Number.parseInt(this.getA3());
      let a2 = Number.parseInt(this.getA2());
      let a4 = Number.parseInt(this.getA4());
      let a6 = Number.parseInt(this.getA6());
      this.graph.weierstrass.create(a1, a3, a2, a4, a6);
    }
  },
  data: function() {
    return {
      a_param: [],
      parametres: false,
      valeurA:'',
      valeurB:'',
      valeurP:''
    }
  }
};
</script>

<style scoped>

</style>