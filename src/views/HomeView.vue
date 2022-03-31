<template>
  <MyMenu />
  <div id="main" class="home">
    <MyGraph />
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from '@/components/MyMenu.vue'
import MyGraph from '@/components/graph/MyGraph.vue'

export default {
  name: 'HomeView',
  components: {
    MyMenu,
    MyGraph,
  }
}
</script>
