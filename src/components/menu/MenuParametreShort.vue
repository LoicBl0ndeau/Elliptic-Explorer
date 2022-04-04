<template>
  <div class="weirstrass">
      <p>
        <input id="a" v-model="a_param" placeholder="a" onclick="getA" /><br/>
        <input id="b" v-model="b_param" placeholder="b"  onclick="getB" /><br/>
        <input id="modulo" v-model="module_param" placeholder="modulo"  onclick="getP" /><br/>
      </p>

      <p>
        <input type="submit" value="Générer la courbe" />
      </p>
  </div>
</template>

<script>

export default {
  name: "MenuParametreShort",
  props: {
    msg1: String,
    a: Number,
    b: Number,
    modulo: Number
  },
  methods: {
    getA() {
      return parseFloat(document.getElementById("a").value)
    },
    getB() {
      return parseFloat(document.getElementById("b").value)
    },
    getP() {
      return parseFloat(document.getElementById("modulo").value)
    },
  },
};
</script>

<style scoped>

</style>