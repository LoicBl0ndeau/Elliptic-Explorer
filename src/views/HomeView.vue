<template>
  <MyMenu />
  <div id="main" class="home">
    <MyGraph />
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MyMenu from '@/components/MyMenu.vue'
import MyGraph from '@/components/MyGraph.vue'
import Menu_parametre from '@/components/Menu_parametre.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    MyMenu,
    MyGraph,
    Menu_parametre
  }
}
</script>
