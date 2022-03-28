<template>
  <div id="calculator" ></div>
</template>

<script>

export default {
  name: "ContinuousShortWeierstrass",
  props: {
      id: {
          type: String
      }
  },
  mounted() {
    console.log(1);
  }
};
</script>

<style scoped>
#calculator {
  width: 100%;
  height:90%;
}
</style>