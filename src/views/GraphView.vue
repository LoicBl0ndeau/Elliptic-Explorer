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

import { weierstrassStore } from "@/stores/weierstrass";

export default {
  name: 'GraphView',
  components: {
    MyMenu,
    MyGraph
  },
  setup() {
    const weierstrass = weierstrassStore();
    
    return { weierstrass };
  },
  mounted () {
    // Graphique par défaut sur page accueil
    this.weierstrass.create(0, 0, 4, 2, 1);
    this.weierstrass.showAddition();
  },
}
</script>
