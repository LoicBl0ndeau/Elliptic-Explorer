<template>
  <MyMenu />
  <!-- the content outside the menu should always be
  in this "main" div. -->
  <div id="main">
    <div id="about-div">
      <!-- english by default -->
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