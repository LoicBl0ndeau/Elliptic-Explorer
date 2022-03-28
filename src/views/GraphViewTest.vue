<template>
  <MyMenu />
  <div id="main">
    <ContinuousShortWeierstrass />
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from '@/components/MyMenu.vue'
import ContinuousShortWeierstrass from '@/components/graph/ContinuousShortWeierstrass.vue'

export default {
  name: 'GraphView',
  components: {
    MyMenu,
    ContinuousShortWeierstrass
  }
}
</script>