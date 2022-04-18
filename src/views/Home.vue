<template>
  <MyMenu />
  <div id="main">
    <div id="about-div">
      <AccueilAnglais />
    </div>
    <div id="graph-div">
      <MyGraph />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from "@/components/MyMenu.vue";
import MyGraph from "@/components/graph/MyGraph.vue";
import AccueilAnglais from "@/components/AccueilAnglais.vue";

export default {
  name: "GraphView",
  components: {
    MyMenu,
    MyGraph,
    AccueilAnglais,
  },
};
</script>