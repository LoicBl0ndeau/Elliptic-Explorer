<template>
  <div class="Montgomery">
    <form
      id="form"
      @submit="checkForm"
      action="/something2"
      method="post"
      novalidate="true"
    >
      <p>
        <input v-model="a_param" placeholder="a"/><br />
        <input v-model="b_param" placeholder="b"/><br />
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
  name: "MenuParametreMont",
  props: {
    msg2: String,
    a: Number,
    b: Number,
    modulo: Number
  },
};
</script>

<style scoped>

</style>