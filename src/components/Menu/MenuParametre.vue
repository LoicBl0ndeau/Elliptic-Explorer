<template>
  <div class="weirstrass">
      <p>
        <input v-model="a_param" placeholder="a"/><br/>
        <input v-model="b_param" placeholder="b"/><br/>
        <input v-model="module_param" placeholder="modulo"/><br/>
        <a v-show="parametres"><span>Paramètres : [{{ a_param }} {{ b_param }} {{ module_param }}]</span></a>
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
    }
  },
  data: function() {
    return {
      a_param: [],
      parametres: false
    }
  }
};
</script>

<style scoped>

</style>