<template>
  <div class="weirstrass">
      <p>
        <input id="a" v-model="a_param" placeholder="a" onclick="RecupA" /><br/>
        <input id="b" v-model="b_param" placeholder="b"  onclick="RecupB" /><br/>
        <input id="modulo" v-model="module_param" placeholder="modulo"  onclick="RecupModulo" /><br/>
      </p>

      <p>
        <input type="submit" value="Générer la courbe" @click="param" />
      </p>
  </div>
</template>

<script>
export default {
  name: "MenuParametre",
  props: {
    msg1: String,
    a: Number,
    b: Number,
    modulo: Number
  },
  methods: {
    param() {
      this.parametres = !this.parametres;
    },
    RecupA() {
      var valeurA = document.getElementById("a").value;
      return{valeurA}
    },
    RecupB() {
      var valeurB = document.getElementById("b").value;
      return{valeurB}
    },
    RecupModulo() {
      var valeurP = document.getElementById("modulo").value;
      return{valeurP}
    },
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