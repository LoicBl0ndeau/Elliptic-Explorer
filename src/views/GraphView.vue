<template>
  <MyMenu />
  <div id="main">
    <MyGraph />
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from '@/components/MyMenu.vue'
import MyGraph from '@/components/graph/MyGraph.vue'

import { graphStore } from "@/stores/graph.js";

export default {
  name: 'GraphView',
  components: {
    MyMenu,
    MyGraph
  },
  setup() {
    const graph = graphStore();

    return { graph };
  },
  mounted () {
    // Graphique par défaut sur page accueil
    this.graph.weierstrass.create(0, 0, 0, 2, 1);
  },
}
</script>
