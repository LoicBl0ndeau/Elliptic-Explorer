<template>
  <div class="edwards">
    <form
      id="form"
      @submit="checkForm"
      action="/something3"
      method="post"
      novalidate="true"
    >
      <p>
        <input v-model="a_param" placeholder="a"/><br />
        <input v-model="b_param" placeholder="b"/><br />
        <input v-model="c_param" placeholder="c"/><br />
        <input v-model="d_param" placeholder="d"/><br />
        <input v-model="module_param" placeholder="modulo"/><br />
      </p>

      <p>
        <input type="submit" value="Générer la courbe" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "MenuParametreEdwards",
  props: {
    msg1: String,
    a: Number,
    b: Number,
    c: Number,
    d: Number,
    modulo: Number
  },
};
</script>

<style scoped>

</style>