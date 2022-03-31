<template>
  <MyMenu />
  <div id="main">
    <ContinuousWeierstrass :a1=1 />
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from '@/components/MyMenu.vue'
import ContinuousWeierstrass from '@/components/graph/ContWeierstrass.vue'

export default {
  name: 'GraphView',
  components: {
    MyMenu,
    ContinuousWeierstrass
  }
}
</script>