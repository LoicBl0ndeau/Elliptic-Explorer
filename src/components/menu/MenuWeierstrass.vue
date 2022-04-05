<template>
  <div class="weirstrass">
      <p>
        <label>a1 : </label>
        <input id="a1" value="0"/><br/>
        <label>a3 : </label>
        <input id="a3" value="0" /><br/>
        <label>a2 : </label>
        <input id="a2" value="0" /><br/>
        <label>a4 : </label>
        <input id="a4" value="2" /><br/>
        <label>a6 : </label>
        <input id="a6" value="1" /><br/>
      </p>
      <p>
        <button value="Générer la courbe" @click="generer"> GENERER </button>
      </p>
  </div>
</template>

<script>
import { graphStore } from "@/stores/graph.js";

export default {
  name: "MenuParametreShort",
  setup() {
    const graphS = graphStore();

    return { graphS };
  },
  methods: {
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
    generer() {
<<<<<<< Updated upstream
      // let a1 = Number.parseInt(this.getA1());
      // let a3 = Number.parseInt(this.getA3());
      // let a2 = Number.parseInt(this.getA2());
      // let a4 = Number.parseInt(this.getA4());
      // let a6 = Number.parseInt(this.getA6());
      // this.graphS.graph.setValueOfParameter("a_{1}", a1);
      // this.graphS.graph.setValueOfParameter("a_{3}", a3);
      // this.graphS.graph.setValueOfParameter("a_{2}", a2);
      // this.graphS.graph.setValueOfParameter("a_{4}", a4);
      // this.graphS.graph.setValueOfParameter("a_{6}", a6);
      // this.graphS.graph.calculator.destroy();
      this.graphS.weierstrass.create(-1, 0, 0, 2, 1);
=======
      if (this.graphS.graph != null) {
        this.graphS.graph.calculator.destroy();
      }
      // On récupère la valeur des paramètres
      let a1 = Number.parseInt(this.getA1());
      let a3 = Number.parseInt(this.getA3());
      let a2 = Number.parseInt(this.getA2());
      let a4 = Number.parseInt(this.getA4());
      let a6 = Number.parseInt(this.getA6());
      // on créé le graphique
      this.graphS.initWeierstrass(a1, a3, a2, a4, a6);
      this.graphS.graph.setValueOfParameter("a_{1}", a1);
      this.graphS.graph.setValueOfParameter("a_{3}", a3);
      this.graphS.graph.setValueOfParameter("a_{2}", a2);
      this.graphS.graph.setValueOfParameter("a_{4}", a4);
      this.graphS.graph.setValueOfParameter("a_{6}", a6);      
      this.graphS.graph.showCurve();
>>>>>>> Stashed changes
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