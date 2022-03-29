<template>
  <div>
    <h1>{{ msg1 }}</h1>

    <form
      id="form"
      @submit="checkForm"
      action="/something"
      method="post"
      novalidate="true"
    >
      <p>
        <input v-model="a_param" placeholder="a"/> a <br />
        <input v-model="b_param" placeholder="b"/> b <br />
        <input v-model="c_param" placeholder="c"/> c <br />
        <input v-model="module_param" placeholder="modulo"/> module <br />
      </p>

      <p>
        <input type="submit" value="Générer la courbe" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "MenuParametre",
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
#parametre {
  width: 100%;
  height: 60%;
}
</style>