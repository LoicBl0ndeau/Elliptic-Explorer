<template>
  <div id="parametre">
    <!-- <div v-if="onclick='weirstrass=true'"> -->
    <h1>{{ msg1 }}</h1>
    <!-- </div> -->

    <form
      id="form"
      @submit="checkForm"
      action="/something"
      method="post"
      novalidate="true"
    >
      <p>
        <input type="number" name="a" v-model.number="a" /> a <br />
        <input type="number" name="b" v-model.number="b" /> b <br />
        <input type="number" name="c" v-model.number="c" /> c <br />
        <input type="number" name="d" v-model.number="d" /> d <br />
        <input type="number" name="modulo" v-model.number="modulo" /> modulo
        <br />
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
  },
};
</script>

<style scoped>
#parametre {
  width: 100%;
  height: 100%;
}
</style>