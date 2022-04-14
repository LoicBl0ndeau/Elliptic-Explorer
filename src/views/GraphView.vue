<template>
  <MyMenu />
  <div id="main">
    <MyHome />      <!-- contains id="my-home-component" -->
    <MyGraph/>      <!-- contains id="calculator" -->
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from '@/components/MyMenu.vue'
import MyGraph from '@/components/graph/MyGraph.vue'
import MyHome from '@/components/home/MyHome.vue'

export default {
  name: 'GraphView',
  components: {
    MyMenu,
    MyGraph,
    MyHome
  },
}
</script>
