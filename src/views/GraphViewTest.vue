<template>
  <MyMenu />
  <div id="main">
    <ModShort/>
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from '@/components/MyMenu.vue'
import ModShort from '@/components/graph/ModShort.vue'

export default {
  name: 'GraphView',
  components: {
    MyMenu,
    ModShort
  }
}
</script>