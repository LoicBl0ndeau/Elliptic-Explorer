<template>
  <!-- NOTE: the id MUST be "calculator", otherwise the graph won't display, see stores/graph.js -->
  <div id="calculator"></div>
</template>

<script>

export default {
  name: "MyGraph",
};
</script>

<style scoped>
#calculator {
  width: 100%;
  height: 100%;
}
</style>