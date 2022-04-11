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


export default {
  name: 'GraphView',
  components: {
    MyMenu,
    MyGraph
  },
}
</script>
