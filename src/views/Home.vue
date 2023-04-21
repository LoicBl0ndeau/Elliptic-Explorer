<template>
  <MyMenu />
  <div id="main">
    <div id="about-div">
      <EnglishIntroduction />
    </div>
    <div id="graph-div">
      <MyGraph />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from "@/components/menu/MyMenu.vue";
import MyGraph from "@/components/graph/MyGraph.vue";
import EnglishIntroduction from "@/components/introduction/EnglishIntroduction.vue";

export default {
  name: "GraphView",
  components: {
    MyMenu,
    MyGraph,
    EnglishIntroduction,
  },
};
</script>